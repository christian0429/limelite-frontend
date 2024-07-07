import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import { OverviewAnalyticsView } from 'src/sections/Home';

// ----------------------------------------------------------------------

const metadata = { title: `${CONFIG.site.name} - Home` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <OverviewAnalyticsView />
    </>
  );
}