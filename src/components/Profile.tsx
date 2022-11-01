import { useEffect, useState, Dispatch } from 'react';
import { settingsDetailSchema } from '../lib/yup';
interface Settings {
  fullName?: string;
  image?: string;
  userName?: string;
}
export function Profile({
  image,
  fullName,
  userName,
  setHasUpdatedSettings,
  setIsUpdatingSettings,
}: {
  image?: string;
  fullName?: string;
  userName?: string;
  setHasUpdatedSettings?: Dispatch<boolean>;
  setIsUpdatingSettings?: Dispatch<boolean>;
}) {
  const [isUpdatingInternalSettings, setIsUpdatingInternalSettings] =
    useState<boolean>(false);
  const [hasUpdatedInternalSettings, setHasUpdatedInternalSettings] =
    useState<boolean>(false);
  const [settingsData, setSettingsData] = useState<Settings>({
    fullName: fullName,
    image: image,
    userName: userName,
  });

  useEffect(() => {
    if (typeof setHasUpdatedSettings !== 'function') return;
    setHasUpdatedSettings(hasUpdatedInternalSettings);
  }, [hasUpdatedInternalSettings, setHasUpdatedSettings]);

  useEffect(() => {
    if (typeof setIsUpdatingSettings !== 'function') return;
    setIsUpdatingSettings(isUpdatingInternalSettings);
  }, [isUpdatingInternalSettings, setIsUpdatingSettings]);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    try {
      setIsUpdatingInternalSettings(true);
      let value = event.currentTarget.value;
      console.debug(JSON.stringify({ [event.currentTarget.name]: value }));
      setSettingsData({ ...settingsData, [event.currentTarget.name]: value });
      console.debug(JSON.stringify(settingsData));
      setIsUpdatingInternalSettings(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        setIsUpdatingInternalSettings(false);
      } else {
        console.error('Unkonwn error in Profile component change handler.');
      }
    }
  };
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    settingsDetailSchema.validate({ ...settingsData }).catch((error: any) => {
      if (error instanceof Error) {
        console.error(`${error.name}: ${error.message}`);
        throw new Error(error.message);
      } else {
        throw new Error(
          `Unkonwn error in Probile component submission handler.`
        );
      }
    });
    event.preventDefault();
    try {
      console.debug(`Updating ${userName}`);
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
        console.debug(`User settings for ${userName} successfully updated`);
        setIsUpdatingInternalSettings(false);
        setHasUpdatedInternalSettings(true);
      } else {
        console.warn(`User settings for ${userName} not updated`);
        setIsUpdatingInternalSettings(false);
        setHasUpdatedInternalSettings(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.log(
          `Unkonwn error after submission in Profile component handler.`
        );
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
                    className="inline-block w-4/5 lg:w-3/5 rounded-md border border-gray-300 py-2 pl-1 font-mono text-xs shadow-sm focus:border-blue-700 focus:ring-blue-700 lg:text-sm"
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
                    className="block w-full max-w-lg rounded-md border border-gray-300 py-2 pl-1 font-mono text-xs shadow-sm focus:border-blue-700 focus:ring-blue-700 lg:text-sm"
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
                    className="block w-full max-w-lg rounded-md border border-gray-300 py-2 pl-1 font-mono text-xs shadow-sm focus:border-blue-700 focus:ring-blue-700 lg:text-sm"
                    value={settingsData?.userName || ''}
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
              <button
                type="submit"
                form={`profile-form`}
                onClick={(event) => {
                  setIsUpdatingInternalSettings(true);
                  handleSubmit(event);
                  setIsUpdatingInternalSettings(false);
                }}
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
