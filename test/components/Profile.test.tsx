import React, { useState, useEffect } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Profile } from '../../src/components/Profile';
import { campaignStubData } from '../cms.data';

describe('Profile', () => {
  it('renders full data without crashing', () => {
    render(
      <Profile
        image={campaignStubData[0].imageUrl}
        fullName="Test"
        userName="tester"
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
          image={campaignStubData[0].imageUrl}
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
});
