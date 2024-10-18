const fs = require('fs'); // For file operations
const path = require('path');

// Mock trash bin list to compare against
const expectedTrashBins = [
  {
    binID: 1,
    location: { lng: 79.879, lat: 6.934 },
    binCapacity: 100,
    currentFillLevel: 50,
    isFull: false,
    lastEmptiedAt: '2024-10-01T10:30:00Z'
  },
  {
    binID: 2,
    location: { lng: 79.882, lat: 6.930 },
    binCapacity: 200,
    currentFillLevel: 200,
    isFull: true,
    lastEmptiedAt: '2024-10-05T14:15:00Z'
  }
];

// Function to deserialize trash bin data (mocked)
const deserialize = (fileName) => {
  const data = fs.readFileSync(path.resolve(__dirname, fileName), 'utf-8');
  return JSON.parse(data); // Assuming the serialized data is in JSON format
};

// Test case for trash bin deserialization
describe('Trash Bin Deserialization', () => {
  test('should correctly deserialize trash bin data', () => {
    try {
      const trashBins = deserialize('trashbins.json'); // Load serialized data

      trashBins.forEach((bin, i) => {
        expect(bin.binID).toBe(expectedTrashBins[i].binID);
        expect(bin.location.lng).toBeCloseTo(expectedTrashBins[i].location.lng, 3);
        expect(bin.location.lat).toBeCloseTo(expectedTrashBins[i].location.lat, 3);
        expect(bin.binCapacity).toBe(expectedTrashBins[i].binCapacity);
        expect(bin.currentFillLevel).toBe(expectedTrashBins[i].currentFillLevel);
        expect(bin.isFull).toBe(expectedTrashBins[i].isFull);
        expect(bin.lastEmptiedAt).toBe(expectedTrashBins[i].lastEmptiedAt);
      });
    } catch (error) {
      console.error('Error during deserialization:', error);
      throw error; // Fail the test if an exception occurs
    }
  });

  // Negative test case: Check for missing data
  test('should handle missing or corrupted data gracefully', () => {
    try {
      const trashBins = deserialize('corrupted_trashbins.json'); // Load corrupted data
      expect(trashBins).toBeDefined();
      expect(trashBins.length).toBeGreaterThan(0);
    } catch (error) {
      expect(error).toBeDefined(); // Expect an error for corrupted data
    }
  });
});
