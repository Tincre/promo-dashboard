import { renderHook, act } from '@testing-library/react';
import { usePromoDashboardData } from '../../../src/lib/hooks/usePromoDashboardData';
import { sortCampaignDataOnIsActiveAndReceiptIdByDate } from '../../../src/lib/sort';
import {
  aggregateChartData,
  replaceDataParamForChartData,
} from '../../../src/lib/coerce';
import { numActiveCampaigns } from '../../../src/lib/sort';

jest.mock('../../../src/lib/sort', () => ({
  sortCampaignDataOnIsActiveAndReceiptIdByDate: jest.fn(),
  numActiveCampaigns: jest.fn(),
}));

jest.mock('../../../src/lib/coerce', () => ({
  replaceDataParamForChartData: jest.fn(),
  aggregateChartData: jest.fn(),
}));

describe('usePromoDashboardData', () => {
  it('returns initial state correctly', () => {
    const { result } = renderHook(() => {
      return usePromoDashboardData([], []);
    });
    expect(result.current.numberOfActiveCampaigns).toBeUndefined();
  });

  it('processes campaigns data and updates state accordingly', () => {
    const mockCampaignsData = [
      {
        /* ... mock CampaignData or CampaignDummyData ... */
      },
    ];
    const sortedMockData = [
      {
        /* ... sorted mock data ... */
      },
    ];
    const transformedMockData = [
      {
        /* ... transformed mock data ... */
      },
    ];

    // Mock the implementation
    (sortCampaignDataOnIsActiveAndReceiptIdByDate as jest.Mock).mockReturnValue(
      sortedMockData
    );
    (replaceDataParamForChartData as jest.Mock).mockReturnValue(
      transformedMockData
    );
    (numActiveCampaigns as jest.Mock).mockReturnValue(5);

    const { result, rerender } = renderHook(
      ({ data, deleted }) => usePromoDashboardData(data, deleted),
      {
        initialProps: { data: mockCampaignsData, deleted: [] },
      }
    );

    // Update hook props
    rerender({ data: mockCampaignsData, deleted: [] });

    expect(result.current.sortedCampaignsData).toEqual(transformedMockData);
    expect(result.current.numberOfActiveCampaigns).toBe(5);
    expect(result.current.statsCampaignsData).toBeDefined();
  });

  // Additional tests can be written for different scenarios, such as:
  // - updating only `campaignsData` and checking the effect on `sortedCampaignsData`
  // - updating only `deletedCampaigns` and observing the effect on `numberOfActiveCampaigns`
});
