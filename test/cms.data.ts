import {
  CursorArrowRaysIcon,
  EnvelopeOpenIcon,
  UsersIcon,
  CurrencyDollarIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';
import { generateSpend, generateClicks } from './gen-data';

export const campaignStubData = [
  {
    name: 'Jane Cooper',
    adTitle: 'Easier taxes 👉️ taxpal.com',
    budget: '$1450',
    description: 'Accounting made simple for small businesses.',
    pid: 'abcdefgh',
    target: 'https://tincre.dev/promo',
    currency: 'USD',
    isActive: true,
    title: 'Paradigm Representative',
    role: 'Admin',
    email: 'janecooper@example.com',
    adCopy: 'Accounting made simple and illegal for small businesses.',
    adCallToAction: "🤞 Don't get audited!",
    buttonText: 'Sign up',
    telephone: '+1-202-555-0170',
    creativeUrls: [
      'https://res.cloudinary.com/tincre/image/upload/v1666907624/tailwindui-salient/taxpal-og_xka3ix_q4ulfc.webp',
    ],
    stats: [
      {
        id: 1,
        name: 'Spend',
        stat: '$1283',
        icon: CurrencyDollarIcon,
        change: '122',
        changeType: 'increase',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: generateSpend(1283 - 122, 1283, 13),
        },
      },
      {
        id: 2,
        name: 'Clicks',
        stat: '1092',
        icon: CursorArrowRaysIcon,
        change: '202',
        changeType: 'increase',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: generateClicks(1092 - 202, 1092, 13),
        },
      },
      {
        id: 3,
        name: 'Views',
        stat: '12909',
        icon: VideoCameraIcon,
        change: '1012',
        changeType: 'increase',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: [
            2.23, 2.215, 2.22, 2.25, 2.245, 2.27, 2.28, 2.29, 2.3, 2.29, 2.325,
            2.325, 2.32,
          ],
        },
      },
      {
        id: 4,
        name: 'CPM',
        stat: '58.16%',
        icon: EnvelopeOpenIcon,
        change: '5.4%',
        changeType: 'increase',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: [
            2.23, 2.215, 2.22, 2.25, 2.245, 2.27, 2.28, 2.29, 2.3, 2.29, 2.325,
            2.325, 2.32,
          ],
        },
      },
      {
        id: 5,
        name: 'CTR',
        stat: '4.57%',
        icon: UsersIcon,
        change: '.2%',
        changeType: 'decrease',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: [
            2.23, 2.215, 2.22, 2.25, 2.245, 2.27, 2.28, 2.29, 2.3, 2.29, 2.325,
            2.325, 2.32,
          ],
        },
      },
      {
        id: 6,
        name: 'CPC',
        stat: '$.03',
        icon: CursorArrowRaysIcon,
        change: '.01',
        changeType: 'decrease',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: [
            2.23, 2.215, 2.22, 2.25, 2.245, 2.27, 2.28, 2.29, 2.3, 2.29, 2.325,
            2.325, 2.32,
          ],
        },
      },
    ],
  },
  // More people...
  {
    name: 'Jane Cooper',
    adTitle: 'Easier taxes 👉️ taxpal.com',
    budget: '$3500',
    description: 'Accounting made simple for small businesses.',
    pid: 'defghijk',
    target: 'https://tincre.dev/promo',
    currency: 'USD',
    isActive: true,
    title: 'Paradigm Representative',
    role: 'Admin',
    email: 'janecooper@example.com',
    adCopy: 'Accounting made simple and illegal for small businesses.',
    adCallToAction: "🤞 Don't get audited!",
    buttonText: 'Sign up',
    telephone: '+1-202-555-0170',
    creativeUrls: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    ],
    stats: [
      {
        id: 1,
        name: 'Spend',
        stat: '$2892',
        icon: CurrencyDollarIcon,
        change: '74',
        changeType: 'increase',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: generateSpend(2892 - 74, 2892, 13),
        },
      },
      {
        id: 2,
        name: 'Clicks',
        stat: '11593',
        icon: CursorArrowRaysIcon,
        change: '121',
        changeType: 'increase',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: generateClicks(11593 - 121, 11593, 13),
        },
      },
      {
        id: 3,
        name: 'Views',
        stat: '312909',
        icon: VideoCameraIcon,
        change: '3491',
        changeType: 'increase',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: [
            2.23, 2.215, 2.22, 2.25, 2.245, 2.27, 2.28, 2.29, 2.3, 2.29, 2.325,
            2.325, 2.32,
          ],
        },
      },
      {
        id: 4,
        name: 'CPM',
        stat: '$4.16',
        icon: EnvelopeOpenIcon,
        change: '5.4%',
        changeType: 'decrease',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: [
            2.23, 2.215, 2.22, 2.25, 2.245, 2.27, 2.28, 2.29, 2.3, 2.29, 2.325,
            2.325, 2.32,
          ],
        },
      },
      {
        id: 5,
        name: 'CTR',
        stat: '6.71%',
        icon: UsersIcon,
        change: '.2%',
        changeType: 'increase',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: [
            2.23, 2.215, 2.22, 2.25, 2.245, 2.27, 2.28, 2.29, 2.3, 2.29, 2.325,
            2.325, 2.32,
          ],
        },
      },
      {
        id: 6,
        name: 'CPC',
        stat: '$.42',
        icon: CursorArrowRaysIcon,
        change: '.01',
        changeType: 'decrease',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: [
            2.23, 2.215, 2.22, 2.25, 2.245, 2.27, 2.28, 2.29, 2.3, 2.29, 2.325,
            2.325, 2.32,
          ],
        },
      },
    ],
  },
  {
    name: 'Jane Cooper',
    adTitle: 'Easier taxes 👉️ taxpal.com',
    budget: '$1000',
    description: 'Accounting made simple for small businesses.',
    pid: 'efghijkl',
    target: 'https://tincre.dev/promo',
    currency: 'USD',
    isActive: true,
    title: 'Paradigm Representative',
    role: 'Admin',
    email: 'janecooper@example.com',
    adCopy: 'Accounting made simple and illegal for small businesses.',
    adCallToAction: "🤞 Don't get audited!",
    buttonText: 'Sign up',
    telephone: '+1-202-555-0170',
    creativeUrls: [
      'https://res.cloudinary.com/tincre/image/upload/v1666907673/tailwindui-salient/background-faqs_nugiew_m0skue.webp',
    ],
    stats: [
      {
        id: 1,
        name: 'Spend',
        stat: '$6',
        icon: CurrencyDollarIcon,
        change: '$6',
        changeType: 'increase',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: generateSpend(0, 6, 13),
        },
      },
      {
        id: 2,
        name: 'Clicks',
        stat: '0',
        icon: CursorArrowRaysIcon,
        change: '0',
        changeType: 'increase',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: generateSpend(0, 0, 13),
        },
      },
      {
        id: 3,
        name: 'Views',
        stat: '16',
        icon: VideoCameraIcon,
        change: '16',
        changeType: 'increase',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: [
            2.23, 2.215, 2.22, 2.25, 2.245, 2.27, 2.28, 2.29, 2.3, 2.29, 2.325,
            2.325, 2.32,
          ],
        },
      },
      {
        id: 4,
        name: 'CPM',
        stat: '$18.16',
        icon: EnvelopeOpenIcon,
        change: '10.0%',
        changeType: 'increase',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: [
            2.23, 2.215, 2.22, 2.25, 2.245, 2.27, 2.28, 2.29, 2.3, 2.29, 2.325,
            2.325, 2.32,
          ],
        },
      },
      {
        id: 5,
        name: 'CTR',
        stat: '1.84%',
        icon: UsersIcon,
        change: '.5%',
        changeType: 'increase',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: [
            2.23, 2.215, 2.22, 2.25, 2.245, 2.27, 2.28, 2.29, 2.3, 2.29, 2.325,
            2.325, 2.32,
          ],
        },
      },
      {
        id: 6,
        name: 'CPC',
        stat: '$.14',
        icon: CursorArrowRaysIcon,
        change: '.02',
        changeType: 'decrease',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: [
            2.23, 2.215, 2.22, 2.25, 2.245, 2.27, 2.28, 2.29, 2.3, 2.29, 2.325,
            2.325, 2.32,
          ],
        },
      },
    ],
  },
  {
    name: 'Jane Cooper',
    adTitle: 'Easier taxes 👉️ taxpal.com',
    budget: '$18150',
    description: 'Accounting made simple for small businesses.',
    pid: 'fghijklm',
    target: 'https://tincre.dev/promo',
    currency: 'USD',
    isActive: true,
    title: 'Paradigm Representative',
    role: 'Admin',
    email: 'janecooper@example.com',
    adCopy: 'Accounting made simple and illegal for small businesses.',
    adCallToAction: "🤞 Don't get audited!",
    buttonText: 'Sign up',
    telephone: '+1-202-555-0170',
    creativeUrls: [
      'https://res.cloudinary.com/tincre/image/upload/v1666907587/tailwindui-salient/screenshots/vat-returns_uhkad6_c8tze2.webp',
    ],
    stats: [
      {
        id: 1,
        name: 'Spend',
        stat: '$7283',
        icon: CurrencyDollarIcon,
        change: '322',
        changeType: 'increase',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: generateSpend(7283 - 322, 7283, 13),
        },
      },
      {
        id: 2,
        name: 'Clicks',
        stat: '1092',
        icon: CursorArrowRaysIcon,
        change: '202',
        changeType: 'increase',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: generateClicks(1092 - 202, 1092, 13),
        },
      },
      {
        id: 3,
        name: 'Views',
        stat: '12909',
        icon: VideoCameraIcon,
        change: '1012',
        changeType: 'increase',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: [
            2.23, 2.215, 2.22, 2.25, 2.245, 2.27, 2.28, 2.29, 2.3, 2.29, 2.325,
            2.325, 2.32,
          ],
        },
      },
      {
        id: 4,
        name: 'CPM',
        stat: '$5.10',
        icon: EnvelopeOpenIcon,
        change: '3.1%',
        changeType: 'increase',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: [
            2.23, 2.215, 2.22, 2.25, 2.245, 2.27, 2.28, 2.29, 2.3, 2.29, 2.325,
            2.325, 2.32,
          ],
        },
      },
      {
        id: 5,
        name: 'CTR',
        stat: '3.33%',
        icon: UsersIcon,
        change: '.3%',
        changeType: 'decrease',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: [
            2.23, 2.215, 2.22, 2.25, 2.245, 2.27, 2.28, 2.29, 2.3, 2.29, 2.325,
            2.325, 2.32,
          ],
        },
      },
      {
        id: 6,
        name: 'CPC',
        stat: '$1.25',
        icon: CursorArrowRaysIcon,
        change: '.03',
        changeType: 'decrease',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: [
            2.23, 2.215, 2.22, 2.25, 2.245, 2.27, 2.28, 2.29, 2.3, 2.29, 2.325,
            2.325, 2.32,
          ],
        },
      },
    ],
  },
  {
    name: 'Jane Cooper',
    adTitle: 'Easier taxes 👉️ taxpal.com',
    budget: '$8725',
    description: 'Accounting made simple for small businesses.',
    pid: 'bcdefghi',
    target: 'https://tincre.dev/promo',

    currency: 'USD',
    isActive: false,
    title: 'Paradigm Representative',
    role: 'Admin',
    email: 'janecooper@example.com',
    adCopy: 'Accounting made simple and illegal for small businesses.',
    adCallToAction: "🤞 Don't get audited!",
    buttonText: 'Sign up',
    telephone: '+1-202-555-0170',
    creativeUrls: [
      'https://res.cloudinary.com/tincre/image/upload/v1666907624/tailwindui-salient/taxpal-og_xka3ix_q4ulfc.webp',
    ],
    stats: [
      {
        id: 1,
        name: 'Spend',
        stat: '$8725',
        icon: CurrencyDollarIcon,
        change: '219',
        changeType: 'increase',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: generateSpend(8725 - 219, 8725, 13),
        },
      },
      {
        id: 2,
        name: 'Clicks',
        stat: '21944',
        icon: CursorArrowRaysIcon,
        change: '421',
        changeType: 'increase',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: generateClicks(21944 - 421, 21944, 13),
        },
      },
      {
        id: 3,
        name: 'Views',
        stat: '62909',
        icon: VideoCameraIcon,
        change: '5042',
        changeType: 'increase',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: [
            2.23, 2.215, 2.22, 2.25, 2.245, 2.27, 2.28, 2.29, 2.3, 2.29, 2.325,
            2.325, 2.32,
          ],
        },
      },
      {
        id: 4,
        name: 'CPM',
        stat: '$8.16',
        icon: EnvelopeOpenIcon,
        change: '5.4%',
        changeType: 'decrease',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: [
            2.23, 2.215, 2.22, 2.25, 2.245, 2.27, 2.28, 2.29, 2.3, 2.29, 2.325,
            2.325, 2.32,
          ],
        },
      },
      {
        id: 5,
        name: 'CTR',
        stat: '4.17%',
        icon: UsersIcon,
        change: '.4%',
        changeType: 'decrease',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: [
            2.23, 2.215, 2.22, 2.25, 2.245, 2.27, 2.28, 2.29, 2.3, 2.29, 2.325,
            2.325, 2.32,
          ],
        },
      },
      {
        id: 6,
        name: 'CPC',
        stat: '$.51',
        icon: CursorArrowRaysIcon,
        change: '.13',
        changeType: 'increase',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: [
            2.23, 2.215, 2.22, 2.25, 2.245, 2.27, 2.28, 2.29, 2.3, 2.29, 2.325,
            2.325, 2.32,
          ],
        },
      },
    ],
  },
  {
    name: 'Jane Cooper',
    adTitle: 'Easier taxes 👉️ taxpal.com',
    budget: '$250',
    description: 'Accounting made simple for small businesses.',
    pid: 'cdefghij',
    target: 'https://tincre.dev/promo',
    currency: 'EUR',
    isActive: false,
    title: 'Paradigm Representative',
    role: 'Admin',
    email: 'janecooper@example.com',
    adCopy: 'Accounting made simple and illegal for small businesses.',
    adCallToAction: "🤞 Don't get audited!",
    buttonText: 'Sign up',
    telephone: '+1-202-555-0170',
    creativeUrls: [
      'https://res.cloudinary.com/tincre/image/upload/v1666907624/tailwindui-salient/taxpal-og_xka3ix_q4ulfc.webp',
    ],
    stats: [
      {
        id: 1,
        name: 'Spend',
        stat: '250',
        icon: CurrencyDollarIcon,
        change: '9',
        changeType: 'increase',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: generateSpend(250 - 9, 250, 13),
        },
      },
      {
        id: 2,
        name: 'Clicks',
        stat: '451',
        icon: CursorArrowRaysIcon,
        change: '20',
        changeType: 'increase',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: generateClicks(451 - 20, 451, 13),
        },
      },
      {
        id: 3,
        name: 'Views',
        stat: '0',
        icon: VideoCameraIcon,
        change: '0',
        changeType: 'increase',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: [
            2.23, 2.215, 2.22, 2.25, 2.245, 2.27, 2.28, 2.29, 2.3, 2.29, 2.325,
            2.325, 2.32,
          ],
        },
      },
      {
        id: 4,
        name: 'CPM',
        stat: '$5.42',
        icon: EnvelopeOpenIcon,
        change: '1.2%',
        changeType: 'increase',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: [
            2.23, 2.215, 2.22, 2.25, 2.245, 2.27, 2.28, 2.29, 2.3, 2.29, 2.325,
            2.325, 2.32,
          ],
        },
      },
      {
        id: 5,
        name: 'CTR',
        stat: '3.57%',
        icon: UsersIcon,
        change: '.3%',
        changeType: 'decrease',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: [
            2.23, 2.215, 2.22, 2.25, 2.245, 2.27, 2.28, 2.29, 2.3, 2.29, 2.325,
            2.325, 2.32,
          ],
        },
      },
      {
        id: 6,
        name: 'CPC',
        stat: '$.16',
        icon: CursorArrowRaysIcon,
        change: '.03',
        changeType: 'increase',
        chartData: {
          labels: [
            '10:00',
            '',
            '',
            '',
            '12:00',
            '',
            '',
            '',
            '2:00',
            '',
            '',
            '',
            '4:00',
          ],
          data: [
            2.23, 2.215, 2.22, 2.25, 2.245, 2.27, 2.28, 2.29, 2.3, 2.29, 2.325,
            2.325, 2.32,
          ],
        },
      },
    ],
  },
];
