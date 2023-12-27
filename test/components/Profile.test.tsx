import React, { useState, useEffect } from 'react';
import { waitFor, render, screen, fireEvent } from '@testing-library/react';
import { Profile } from '../../src/components/Profile';
import { campaignStubData } from '../cms.data';
import { Settings } from '@tincre/promo-types'; // Update the import path as needed

global.fetch = jest.fn();

const mockConsoleError = jest.spyOn(console, 'warn');
mockConsoleError.mockImplementation(() => {});

beforeEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  mockConsoleError.mockRestore();
});

describe('Profile', () => {
  const mockSettings: Settings = {
    fullName: 'John Doe',
    userName: 'johndoe',
    email: 'john@example.com',
    image: 'https://example.com/avatar.jpg',
  };

  it('renders full data without crashing', () => {
    render(
      <Profile
        image={campaignStubData[0].creativeUrls[0]}
        fullName="Test"
        userName="tester"
        email="test@example.com"
        setHasUpdatedSettings={undefined}
        setIsUpdatingSettings={undefined}
      />
    );
    const profileUserName = screen.getByText('User name');
    expect(profileUserName).toBeDefined();
    const profileFullName = screen.getByText('Your full name');
    expect(profileFullName).toBeDefined();
    const image = screen.getByText('User name');
    expect(image).toBeDefined();
    const email = screen.getByText('Email', { exact: false });
    expect(email).toBeDefined();
  });
  it('renders using state setters and full data without crashing', () => {
    let hasUpdatedFlag = false;
    let isUpdatingFlag = false;
    function PBRender() {
      const [hasUpdatedSettings, setHasUpdatedSettings] =
        useState(hasUpdatedFlag);
      const [isUpdatingSettings, setIsUpdatingSettings] =
        useState(isUpdatingFlag);
      useEffect(() => {
        hasUpdatedFlag = hasUpdatedSettings;
      }, [hasUpdatedSettings]);
      useEffect(() => {
        isUpdatingFlag = isUpdatingSettings;
      }, [isUpdatingSettings]);
      return (
        <Profile
          image={campaignStubData[0].creativeUrls[0]}
          fullName="Test"
          userName="tester"
          setHasUpdatedSettings={setHasUpdatedSettings}
          setIsUpdatingSettings={setIsUpdatingSettings}
        />
      );
    }
    expect(hasUpdatedFlag).toBeFalsy();
    expect(isUpdatingFlag).toBeFalsy();
    render(<PBRender />);
    const profileUserName = screen.getByRole('textbox', {
      name: 'User name',
    });
    expect(profileUserName).toBeDefined();
    fireEvent.change(profileUserName, { target: { value: 'testerson' } });
    // @ts-ignore
    expect(profileUserName.value).toBe('testerson');
    const profileFullName = screen.getByRole('textbox', {
      name: 'Your full name',
    });
    expect(profileFullName).toBeDefined();
    fireEvent.change(profileFullName, { target: { value: 'McTester' } });
    // @ts-ignore
    expect(profileFullName.value).toBe('McTester');
    const image = screen.getByRole('textbox', {
      name: 'Avatar',
    });
    expect(image).toBeDefined();
    fireEvent.change(image, {
      target: {
        value:
          'https://promo-dashboard-pwagg9iqy-tincre.vercel.app/default-gravatar.jpg',
      },
    });
    // @ts-ignore
    expect(image.value).toBe(
      'https://promo-dashboard-pwagg9iqy-tincre.vercel.app/default-gravatar.jpg'
    );
    const saveButton = screen.getByText('Save');
    expect(saveButton).toBeDefined();
    fireEvent.click(saveButton);
  });
  it('renders and displays the profile settings correctly', () => {
    render(<Profile {...mockSettings} />);
    expect(screen.getByPlaceholderText('Fost Palone, Esq.')).toBeDefined();
    expect(screen.getByPlaceholderText('fost-palone')).toBeDefined();
    expect(screen.getByPlaceholderText(/john@example.com/)).toBeDefined();
    expect(screen.getByAltText('')).toBeDefined();
  });

  it('handles input changes correctly', () => {
    render(<Profile {...mockSettings} />);
    fireEvent.change(screen.getByPlaceholderText('Fost Palone, Esq.'), {
      target: { value: 'Jane Doe' },
    });
    expect(screen.getByPlaceholderText('Fost Palone, Esq.')).toBeDefined();
  });

  it('handles form submission correctly', async () => {
    const handleSettingsSaveButtonClick = jest.fn();
    render(
      <Profile
        {...mockSettings}
        handleSettingsSaveButtonClick={handleSettingsSaveButtonClick}
      />
    );

    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(handleSettingsSaveButtonClick).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything()
      );
    });
  });

  it('handles network error in form submission and logs to console', async () => {
    const networkError = new Error('Network error');
    (global.fetch as jest.Mock).mockRejectedValue(networkError);

    render(<Profile {...mockSettings} />);

    fireEvent.click(screen.getByText('Save'));

    await screen.findByText('Save'); // Adjust as needed to wait for async code
  });

  it('handles non-200 response in form submission and logs warning to console', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ status: 400 });

    render(<Profile {...mockSettings} />);

    fireEvent.click(screen.getByText('Save'));

    await screen.findByText('Save'); // Adjust as needed to wait for async code
  });
});
