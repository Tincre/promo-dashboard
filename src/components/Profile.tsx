/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { useEffect, useState, Dispatch, MouseEvent } from 'react';
import { settingsDetailSchema } from '../lib/yup';
import { Settings } from '../lib/types';
import { Button } from '../components/Button';

export function Profile({
  image,
  fullName,
  userName,
  email,
  setHasUpdatedSettings,
  setIsUpdatingSettings,
  handleSettingsSaveButtonClick,
}: {
  image?: string;
  fullName?: string;
  userName?: string;
  email?: string;
  setHasUpdatedSettings?: Dispatch<boolean>;
  setIsUpdatingSettings?: Dispatch<boolean>;
  handleSettingsSaveButtonClick?: (
    event: MouseEvent<HTMLButtonElement>,
    settingsData: Settings
  ) => void;
}) {
  const [isUpdatingInternalSettings, setIsUpdatingInternalSettings] =
    useState<boolean>(false);
  const [hasUpdatedInternalSettings, setHasUpdatedInternalSettings] =
    useState<boolean>(false);
  const [settingsData, setSettingsData] = useState<Settings>({
    fullName: fullName,
    image: image,
    userName: userName,
    email: email,
  });
  const [submitEvent, setSubmitEvent] =
    useState<MouseEvent<HTMLButtonElement>>();
  useEffect(() => {
    if (typeof setHasUpdatedSettings !== 'undefined') {
      setHasUpdatedSettings(hasUpdatedInternalSettings);
    }
  }, [hasUpdatedInternalSettings, setHasUpdatedSettings]);

  useEffect(() => {
    if (typeof setIsUpdatingSettings !== 'undefined') {
      setIsUpdatingSettings(isUpdatingInternalSettings);
    }
  }, [isUpdatingInternalSettings, setIsUpdatingSettings]);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    try {
      setIsUpdatingInternalSettings(true);
      let value = event.currentTarget.value;
      setSettingsData({ ...settingsData, [event.currentTarget.name]: value });
      setIsUpdatingInternalSettings(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`promo-dashboard::Profile::${error.message}`);
        setIsUpdatingInternalSettings(false);
      } else {
        const message = 'Unkonwn error in Profile component change handler.';
        console.error(`promo-dashboard::Profile::${message}`);
      }
    }
  };
  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    setSubmitEvent(event);
    settingsDetailSchema.validate({ ...settingsData }).catch((error: any) => {
      if (error instanceof Error) {
        console.error(`${error.name}: ${error.message}`);
        throw new Error(error.message);
      } else {
        throw new Error(
          `Unknown error in Profile component submission handler validation step.`
        );
      }
    });
    event.preventDefault();

    try {
      setIsUpdatingInternalSettings(true);
      const data = {
        ...settingsData,
      };
      const response = await fetch('/api/account', {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      });
      if (response?.status === 200) {
        setIsUpdatingInternalSettings(false);
        setHasUpdatedInternalSettings(true);
      } else {
        console.warn(
          `promo-dashboard::Profile::User settings for ${userName} not updated`
        );
        setIsUpdatingInternalSettings(false);
        setHasUpdatedInternalSettings(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(`promo-dashboard::Profile::${error.message}`);
      } else {
        const message =
          'Unkonwn error after submission in Profile component handler.';
        console.error(`promo-dashboard::Profile::${message}`);
      }
      setIsUpdatingInternalSettings(false);
      setHasUpdatedInternalSettings(false);
    }
  };

  return (
    <div id="profile">
      <form id={`profile-form`} className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <div className="mt-6 space-y-6 sm:mt-8 sm:space-y-5">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Profile | Settings
              </h3>
              <div className="text-left sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="image"
                  className="inline-block text-sm font-medium text-gray-700 mt-4 sm:pt-2"
                >
                  Avatar{' '}
                </label>
                <div className="mt-2 sm:col-span-2">
                  <input
                    disabled={isUpdatingInternalSettings}
                    id="image"
                    name="image"
                    placeholder="https://www.gravatar.com/avatar/"
                    type="url"
                    pattern="https://.*"
                    className="inline-block w-4/5 lg:w-3/5 rounded-md border border-gray-300 py-2 pl-1 font-mono text-xs shadow-sm focus:border-blue-700 focus:ring-blue-700 lg:text-sm dark:bg-slate-500 dark:border-slate-300 dark:text-slate-200 dark:focus:border-slate-200"
                    value={settingsData?.image || ''}
                    maxLength={360}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <img
                    src={settingsData?.image || '/default-gravatar.jpg'}
                    className="inline-block mx-4 xl:mx-2 h-8 rounded-full content-center"
                    alt=""
                  />
                </div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mt-4 sm:pt-2"
                >
                  Your full name
                </label>
                <div className="mt-2 sm:col-span-2">
                  <input
                    disabled={isUpdatingInternalSettings}
                    placeholder="Fost Palone, Esq."
                    id="fullName"
                    name="fullName"
                    type="text"
                    className="block w-full max-w-lg rounded-md border border-gray-300 py-2 pl-1 font-mono text-xs shadow-sm focus:border-blue-700 focus:ring-blue-700 lg:text-sm dark:bg-slate-500 dark:border-slate-300 dark:text-slate-200 dark:focus:border-slate-200"
                    value={settingsData?.fullName || ''}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <label
                  htmlFor="userName"
                  className="block text-sm font-medium text-gray-700 mt-4 sm:pt-2"
                >
                  User name
                </label>
                <div className="mt-2 sm:col-span-2">
                  <input
                    disabled={isUpdatingInternalSettings}
                    id="userName"
                    placeholder="fost-palone"
                    name="userName"
                    type="text"
                    pattern="^[A-Za-z0-9_]{0,15}$"
                    className="block w-full max-w-lg rounded-md border border-gray-300 py-2 pl-1 font-mono text-xs shadow-sm focus:border-blue-700 focus:ring-blue-700 lg:text-sm dark:bg-slate-500 dark:border-slate-300 dark:text-slate-200 dark:focus:border-slate-200"
                    value={settingsData?.userName || ''}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mt-4 sm:pt-2"
                >
                  Email{' '}
                  <span className="text-xs text-gray-500 dark:text-slate-600">no changes</span>
                </label>
                <div className="mt-2 sm:col-span-2">
                  <input
                    disabled={true}
                    id="email"
                    placeholder={settingsData?.email || 'example@example.com'}
                    name="email"
                    type="email"
                    className="block w-full max-w-lg rounded-md border border-gray-300 py-2 pl-1 font-mono text-xs shadow-sm focus:border-blue-700 focus:ring-blue-700 lg:text-sm dark:bg-slate-500 dark:text-slate-600"
                    value={settingsData?.email || ''}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="pt-5">
            <div className="flex justify-end">
              <Button
                type="submit"
                form={`profile-form`}
                id="promo-dashboard-save-button"
                onClick={(event) => {
                  setIsUpdatingInternalSettings(true);
                  handleSubmit(event);
                  if (
                    typeof handleSettingsSaveButtonClick !== 'undefined' &&
                    typeof settingsData !== 'undefined'
                  ) {
                    handleSettingsSaveButtonClick(event, settingsData);
                  }
                  setIsUpdatingInternalSettings(false);
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
