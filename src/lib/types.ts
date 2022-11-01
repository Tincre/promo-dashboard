export interface CampaignData {
  pid?: string;
  email?: string;
  adTitle?: string;
  budget?: string | number;
  description?: string;
  target?: string;
  adCopy?: string;
  imageUrl?: string;
  adCallToAction?: string;
  buttonText?: string;
  isActive?: boolean;
  currency?: string;
  stats?: object[];
}
