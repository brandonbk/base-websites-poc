import React from 'react';
import PropTypes from 'prop-types';
import redirect from '../lib/redirect';
import errors from '../lib/errors';
import { sectionAsPath, sectionHref } from '../lib/section-paths';

import DefaultLayout from '../layouts/Default';
import BlockHeroA from '../components/Site/Content/Block/HeroA';
import BlockCardListGroupA from '../components/Site/Content/Block/CardListGroupA';
import BlockCardDeckA from '../components/Site/Content/Block/CardDeckA';
import PlaceholderAd from '../components/Site/PlaceholderAd';

import sectionPage from '../gql/queries/section-page.graphql';

const SectionPage = ({ section }) => (
  <DefaultLayout>
    <main>
      <h1>{section.name}</h1>
      <BlockHeroA
        className="mb-3"
        query={{
          sectionId: section.id,
          first: 7,
          requiresImage: true,
        }}
      />
      <hr />
      <div className="row">
        <div className="col-lg-4">
          <BlockCardListGroupA
            className="my-3"
            header="Products"
            query={{
              sectionId: section.id,
              first: 4,
              includeContentTypes: ['Product'],
              requiresImage: true,
            }}
          />
        </div>
        <div className="col-lg-4 p-0">
          <PlaceholderAd size="300x600" className="my-3" />
        </div>
        <div className="col-lg-4">
          <BlockCardListGroupA
            className="my-3"
            header="Firearms"
            query={{
              sectionId: 56156,
              first: 4,
              requiresImage: true,
            }}
          />
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-lg-4">
          <BlockCardListGroupA
            className="my-3"
            header="News"
            query={{
              sectionId: section.id,
              first: 4,
              includeContentTypes: ['News', 'PressRelease'],
              requiresImage: true,
            }}
          />
        </div>
        <div className="col-lg-4">
          <BlockCardListGroupA
            className="my-3"
            header="Features"
            query={{
              sectionId: section.id,
              first: 4,
              includeContentTypes: ['Article', 'Blog', 'MediaGallery'],
              requiresImage: true,
            }}
          />
        </div>
        <div className="col-lg-4">
          <BlockCardListGroupA
            className="my-3"
            header="Video"
            query={{
              sectionId: section.id,
              first: 4,
              includeContentTypes: ['Video'],
              requiresImage: true,
            }}
          />
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-lg-4 p-0">
          <PlaceholderAd size="300x600" className="my-3" />
        </div>
        <div className="col-lg-4 p-0" />
        <div className="col-lg-4 p-0">
          <PlaceholderAd size="300x600" className="my-3" />
        </div>
      </div>
      <hr />
      <BlockCardDeckA
        query={{
          sectionId: section.id,
          first: 8,
        }}
      />
    </main>
  </DefaultLayout>
);

SectionPage.getInitialProps = async (ctx) => {
  const { query, apollo, res } = ctx;
  const { alias } = query;
  const input = { alias };
  const variables = { input };

  // @todo Should this be a watch query?
  // @todo Do we still need try/catch?
  const { data } = await apollo.query({ query: sectionPage, variables });
  const { websiteSectionAlias, websiteSectionRedirect } = data;
  if (websiteSectionAlias) {
    return { section: websiteSectionAlias };
  }
  if (websiteSectionRedirect && websiteSectionRedirect.alias) {
    const { alias: redirectAlias } = websiteSectionRedirect;
    redirect(res, sectionHref(redirectAlias), sectionAsPath(redirectAlias));
    return {};
  }
  throw errors.notFound();
};

SectionPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  section: PropTypes.object.isRequired,
};

export default SectionPage;
