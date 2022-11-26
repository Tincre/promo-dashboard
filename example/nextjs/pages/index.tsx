import { useState, useEffect, MouseEvent } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { PromoDashboard, CampaignData } from '../../../dist';
import { campaignStubData } from '../cms.data';

const Home: NextPage = () => {
  const [isRepeatButtonClicked, setIsRepeatButtonClicked] = useState(false);
  const [promoData, setPromoData] = useState({});
  const handleRepeatButtonClick = (
    event: MouseEvent<HTMLButtonElement>,
    data: CampaignData
  ) => {
    setIsRepeatButtonClicked(true);
    console.debug(`handleRepeatButtonClick::type ${event.type}`);
    console.debug(
      `handleRepeatButtonClick::Repeat button was clicked, updating state.`
    );
    setPromoData({ ...data });
    console.debug(`handleRepeatButtonClick::data ${JSON.stringify(data)}`);
  };
  useEffect(() => {
    console.debug(`useEffect::promoData::${JSON.stringify(promoData)}`);
  }, [promoData]);

  useEffect(() => {
    console.debug(`useEffect::isRepeatButtonClicked::${isRepeatButtonClicked}`);
  }, [isRepeatButtonClicked]);
  return (
    <div className="" suppressHydrationWarning={true}>
      <Head>
        <title>Promo Dashboard Demo</title>
        <meta
          name="description"
          content="Generated by create next app, by Tincre, for Promo Dashboard users."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="my-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-center">
            Welcome to the{' '}
            <a href="https://tincre.dev/promo">Promo Dashboard</a> demo!
          </h1>
          <p className="pt-8 pb-4">
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://tincre.dev/docs"
              className="border border-1 border-indigo-300 hover:border-indigo-700 py-3 px-5 rounded-md hover:bg-indigo-700 hover:text-indigo-100"
            >
              Read the docs
            </a>
          </p>
          <p className="py-4">
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://community.tincre.dev/c/promo-button"
              className="border border-1 border-indigo-300 hover:border-indigo-700 py-3 px-5 rounded-md hover:bg-indigo-700 hover:text-indigo-100"
            >
              Abuse your community
            </a>
          </p>
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p style={{ marginTop: '20px', marginBottom: '10px' }}>
            <code>npm install @tincre/promo-dashboard</code>
          </p>
          <PromoDashboard
            campaignsData={campaignStubData}
            handleRepeatButtonClick={handleRepeatButtonClick}
          />
        </div>
      </main>

      <footer className="text-center w-full bottom-0 pb-12">
        <a
          href="https://tincre.com"
          target="_blank"
          className="hover:text-gray-900 text-gray-700 hover:underline"
          rel="noreferrer"
        >
          Tincre
        </a>
      </footer>
    </div>
  );
};

export default Home;
