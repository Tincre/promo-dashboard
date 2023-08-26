import { CampaignData, CampaignDummyData } from './types';

const EMAILDOMAIN = 'tincre.dev';
const EMAILLOCALPART = 'team';

export const getSupportLink = (
  data: CampaignData | CampaignDummyData,
  emailDomain?: string,
  emailLocalPart?: string
) => {
  const supportDomain = emailDomain || EMAILDOMAIN;
  const localPart = emailLocalPart || EMAILLOCALPART;

  return `mailto:${localPart}@${supportDomain}?subject=${
    data.pid
  }%20-%20Support%20request%20from%20${supportDomain}&body=Hi!%20I%20am%20reaching%20out%20to%20request%20support%20for%20campaign%20${
    data.pid
  }.%0A%0AMy%20issue%3A%0A%0A%0A%0ACampaign%20input%20data%3A%0A%20%20Ad%20Title%3A%20${
    data?.adTitle || ''
  }%0A%20%20Target%20link%3A%20${data?.target || ''}%0A%20%20Budget%3A%20${
    data?.budget || ''
  }%0A%20%20Ad%20Copy%3A%20${
    data?.adCopy || ''
  }%0A%20%20Call%20to%20action%3A%20${
    data?.adCallToAction || ''
  }%0A%20%20Button%20Text%3A%20${data?.buttonText || ''}`;
};
