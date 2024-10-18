import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { Auth0Provider } from "@auth0/auth0-react";
import Routes from "./Routes"; // Adjust the import path as necessary

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
      {component}
    </Auth0Provider>
  );
};

describe("Routes Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mock calls
  });

  test("should display a list of routes correctly", async () => {
    // Mocking the API response
    const routesData = [
      {
        _id: "1",
        routeName: "Route A",
        driver: { name: "John" },
        startLocation: ["Location A"],
        endLocation: ["Location B"],
        totalDistance: 10,
        status: "Active",
      },
      {
        _id: "2",
        routeName: "Route B",
        driver: null,
        startLocation: ["Location C"],
        endLocation: ["Location D"],
        totalDistance: 20,
        status: "Inactive",
      },
    ];

    // Mock the GET request
    axios.get.mockResolvedValueOnce({ data: routesData });

    renderWithAuth0(<Routes />); // Render the component

    // Check for loading state
    expect(screen.getByText(/Loading routes.../i)).toBeInTheDocument();

    // Wait for routes to load
    await waitFor(() => expect(screen.queryByText(/Loading routes.../i)).not.toBeInTheDocument());

    // Check if the routes are displayed
    expect(screen.getByText("Route A")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Location A")).toBeInTheDocument();
    expect(screen.getByText("Location B")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("Route B")).toBeInTheDocument();
    expect(screen.getByText("No driver assigned")).toBeInTheDocument();
  });

  // Negative test case: Simulate an error when fetching routes
  test("should display an error message when fetching routes fails", async () => {
    axios.get.mockRejectedValueOnce(new Error("Error fetching routes.")); // Mock the GET request to fail

    renderWithAuth0(<Routes />); // Render the component

    // Check for loading state
    expect(screen.getByText(/Loading routes.../i)).toBeInTheDocument();

    // Wait for error message to appear
    await waitFor(() => expect(screen.queryByText(/Loading routes.../i)).not.toBeInTheDocument());
    expect(screen.getByText(/Error fetching routes./i)).toBeInTheDocument();
  });

  // Test for "Access Denied" when not authenticated
  test("should display Access Denied message when not authenticated", () => {
    render(<Routes />); // Render the component without Auth0Provider

    expect(screen.getByText(/Access Denied!/i)).toBeInTheDocument();
    expect(screen.getByText(/You need to be logged in to view this page./i)).toBeInTheDocument();
  });

  // Test for route deletion
  test("should delete a route and update the list", async () => {
    const routesData = [
      {
        _id: "1",
        routeName: "Route A",
        driver: { name: "John" },
        startLocation: ["Location A"],
        endLocation: ["Location B"],
        totalDistance: 10,
        status: "Active",
      },
    ];

    // Mock the GET request to return one route
    axios.get.mockResolvedValueOnce({ data: routesData });

    renderWithAuth0(<Routes />); // Render the component

    // Wait for routes to load
    await waitFor(() => expect(screen.queryByText(/Loading routes.../i)).not.toBeInTheDocument());

    // Simulate deletion
    axios.delete.mockResolvedValueOnce({});
    const deleteButton = screen.getByRole("button", { name: /trash/i });
    fireEvent.click(deleteButton);

    // Check if the route is removed
    await waitFor(() => expect(screen.queryByText("Route A")).not.toBeInTheDocument());
  });
});
