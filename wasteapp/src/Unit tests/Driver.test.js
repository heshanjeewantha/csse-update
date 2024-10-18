import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { Auth0Provider } from "@auth0/auth0-react";
import Drivers from "./Drivers"; // Adjust the import path as necessary
import { MemoryRouter } from "react-router-dom";

// Mocking axios
jest.mock("axios");

// A helper function to render the component with Auth0Provider
const renderWithAuth0 = (component) => {
  return render(
    <Auth0Provider
      domain="test-domain"
      clientId="test-client-id"
      redirectUri="http://localhost"
    >
      <MemoryRouter>{component}</MemoryRouter>
    </Auth0Provider>
  );
};

describe("Drivers Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mock calls
  });

  test("should display a list of drivers correctly", async () => {
    // Mocking the API response
    const driversData = [
      {
        _id: "1",
        name: "John Doe",
        employeeId: "E123",
        vehicleNumber: "VN-001",
        routes: [{ _id: "route1", routeName: "Route A" }],
      },
      {
        _id: "2",
        name: "Jane Smith",
        employeeId: "E456",
        vehicleNumber: "VN-002",
        routes: [],
      },
    ];

    // Mock the GET request
    axios.get.mockResolvedValueOnce({ data: driversData });

    renderWithAuth0(<Drivers />); // Render the component

    // Check for loading state
    expect(screen.getByText(/Loading drivers.../i)).toBeInTheDocument();

    // Wait for drivers to load
    await waitFor(() => expect(screen.queryByText(/Loading drivers.../i)).not.toBeInTheDocument());

    // Check if the drivers are displayed
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("E123")).toBeInTheDocument();
    expect(screen.getByText("VN-001")).toBeInTheDocument();
    expect(screen.getByText("Route A")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("No routes assigned")).toBeInTheDocument();
  });

  // Negative test case: Simulate an error when fetching drivers
  test("should display an error message when fetching drivers fails", async () => {
    axios.get.mockRejectedValueOnce(new Error("Error fetching drivers.")); // Mock the GET request to fail

    renderWithAuth0(<Drivers />); // Render the component

    // Check for loading state
    expect(screen.getByText(/Loading drivers.../i)).toBeInTheDocument();

    // Wait for error message to appear
    await waitFor(() => expect(screen.queryByText(/Loading drivers.../i)).not.toBeInTheDocument());
    expect(screen.getByText(/Error fetching drivers/i)).toBeInTheDocument();
  });

  // Test for "Access Denied" when not authenticated
  test("should display Access Denied message when not authenticated", () => {
    render(<Drivers />); // Render the component without Auth0Provider

    expect(screen.getByText(/Access Denied!/i)).toBeInTheDocument();
    expect(screen.getByText(/You need to be logged in to view this page./i)).toBeInTheDocument();
  });

  // Test for driver deletion
  test("should delete a driver and update the list", async () => {
    const driversData = [
      {
        _id: "1",
        name: "John Doe",
        employeeId: "E123",
        vehicleNumber: "VN-001",
        routes: [{ _id: "route1", routeName: "Route A" }],
      },
    ];

    // Mock the GET request to return one driver
    axios.get.mockResolvedValueOnce({ data: driversData });

    renderWithAuth0(<Drivers />); // Render the component

    // Wait for drivers to load
    await waitFor(() => expect(screen.queryByText(/Loading drivers.../i)).not.toBeInTheDocument());

    // Simulate deletion
    axios.delete.mockResolvedValueOnce({});
    const deleteButton = screen.getByRole("button", { name: /trash/i });
    fireEvent.click(deleteButton);

    // Check if the driver is removed
    await waitFor(() => expect(screen.queryByText("John Doe")).not.toBeInTheDocument());
  });
});
