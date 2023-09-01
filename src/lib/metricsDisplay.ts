import { CampaignMetrics, HeroiconIcon } from '../lib/types';
import {
  CursorArrowRaysIcon,
  EnvelopeOpenIcon,
  UsersIcon,
  CurrencyDollarIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';

const METRICS_ICONS: { [index: string]: HeroiconIcon } = {
  Spend: CurrencyDollarIcon,
  Views: VideoCameraIcon,
  Clicks: CursorArrowRaysIcon,
  Reach: UsersIcon,
  CPC: CursorArrowRaysIcon,
  CTR: UsersIcon,
  CPM: EnvelopeOpenIcon,
  CPV: VideoCameraIcon,
};
/*
 * Return the correct icon for the given metric.
 *
 */
export function getIconForMetric(metric: CampaignMetrics): HeroiconIcon {
  return METRICS_ICONS[metric];
}
