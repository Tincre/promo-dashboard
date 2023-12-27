import { renderHook, act } from '@testing-library/react-hooks';
import { useActiveCampaignsNumber } from '../../../src/lib/hooks/useActiveCampaignsNumber';
import { numActiveCampaigns } from '../../../src/lib/sort';

jest.mock('../../../src/lib/sort', () => ({
  numActiveCampaigns: jest.fn(),
}));

describe('useActiveCampaignsNumber', () => {
  it('should return undefined when sortedCampaignsData is empty', () => {
    const { result } = renderHook(() => useActiveCampaignsNumber([], []));
    expect(result.current).toBeUndefined();
  });

  it('should return the correct number of active campaigns', () => {
    const mockData = [
      {
        /* some mock CampaignSortedData */
      },
      {
        /* ... */
      },
    ];
    const mockDeletedCampaigns = ['campaign1'];

    // Mock the implementation of numActiveCampaigns
    (numActiveCampaigns as jest.Mock).mockReturnValue(5);

    const { result } = renderHook(() =>
      useActiveCampaignsNumber(mockData, mockDeletedCampaigns)
    );

    expect(numActiveCampaigns).toHaveBeenCalledWith(
      mockData,
      mockDeletedCampaigns
    );
    expect(result.current).toBe(5);
  });

  it('should update the number of active campaigns when dependencies change', () => {
    let mockData = [
      {
        /* ... */
      },
    ];
    let mockDeletedCampaigns = ['campaign1'];

    const { result, rerender } = renderHook(
      ({ data, deleted }) => useActiveCampaignsNumber(data, deleted),
      {
        initialProps: { data: mockData, deleted: mockDeletedCampaigns },
      }
    );

    // Change in campaigns
    mockData = [
      {
        /* new data */
      },
    ];
    (numActiveCampaigns as jest.Mock).mockReturnValue(3);

    rerender({ data: mockData, deleted: mockDeletedCampaigns });

    expect(numActiveCampaigns).toHaveBeenCalledWith(
      mockData,
      mockDeletedCampaigns
    );
    expect(result.current).toBe(3);
  });
});
