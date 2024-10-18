const fs = require('fs'); // For file operations
const path = require('path');

// Mock pickup list to compare against
const expectedPickups = [
  {
    _id: "1",
    user: { name: "John Doe" },
    wasteBin: { location: { coordinates: [79.879, 6.934] } },
    pickupDate: "2024-10-01T10:30:00Z",
    isCompleted: true,
    collectedWasteAmount: 50
  },
  {
    _id: "2",
    user: { name: "Jane Smith" },
    wasteBin: { location: { coordinates: [79.882, 6.930] } },
    pickupDate: "2024-10-05T14:15:00Z",
    isCompleted: false,
    collectedWasteAmount: 200
  }
];

// Function to deserialize pickup data (mocked)
const deserialize = (fileName) => {
  const data = fs.readFileSync(path.resolve(__dirname, fileName), 'utf-8');
  return JSON.parse(data); // Assuming the serialized data is in JSON format
};

// Test case for pickup deserialization
describe('Pickup Deserialization', () => {
  test('should correctly deserialize pickup data', () => {
    try {
      const pickups = deserialize('pickups.json'); // Load serialized data

      pickups.forEach((pickup, i) => {
        expect(pickup._id).toBe(expectedPickups[i]._id);
        expect(pickup.user.name).toBe(expectedPickups[i].user.name);
        expect(pickup.wasteBin.location.coordinates[0]).toBeCloseTo(expectedPickups[i].wasteBin.location.coordinates[0], 3);
        expect(pickup.wasteBin.location.coordinates[1]).toBeCloseTo(expectedPickups[i].wasteBin.location.coordinates[1], 3);
        expect(new Date(pickup.pickupDate)).toEqual(new Date(expectedPickups[i].pickupDate));
        expect(pickup.isCompleted).toBe(expectedPickups[i].isCompleted);
        expect(pickup.collectedWasteAmount).toBe(expectedPickups[i].collectedWasteAmount);
      });
    } catch (error) {
      console.error('Error during deserialization:', error);
      throw error; // Fail the test if an exception occurs
    }
  });

  // Negative test case: Check for missing or corrupted data
  test('should handle missing or corrupted data gracefully', () => {
    try {
      const pickups = deserialize('corrupted_pickups.json'); // Load corrupted data
      expect(pickups).toBeDefined();
      expect(pickups.length).toBeGreaterThan(0);
    } catch (error) {
      expect(error).toBeDefined(); // Expect an error for corrupted data
    }
  });
});
