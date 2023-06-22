/** @jsxImportSource @emotion/react */
import { MatchRouteLink, RouteLink } from '../routing/RouteLink';
import { colors } from '../styles/vars';
import { t } from './RouteLinkDemonstration.i18n';
import { css } from '@emotion/react';
import * as React from 'react';

const styles = {
  link: css`
    text-decoration: none;
    //color: ${colors.grey};
    color: green;
  `,
  activeLink: css`
    //font-weight: bold;
    //text-decoration: underline !important;
    color: red;
  `
};

export const RouteLinkDemonstration = () => {
  return (
    <>
      <h1>{t.RouteLinkDemonstration()}</h1>
      <div
        css={css`
          display: flex;

          > div {
            margin: 20px;
          }
        `}
      >
        <NoMatch />
        <PartialMatch />
        <FullMatch />
      </div>
    </>
  );
};

const NoMatch = () => (
  <div>
    <p>NoMatch</p>
    <p>
      <RouteLink
        route={{ name: 'TestRoute' }}
        css={styles.link}
        element="Button"
      >
        TestRoute
      </RouteLink>
    </p>
    <p>
      <RouteLink
        route={{ name: 'TestSubRoute' }}
        css={styles.link}
        element="Button"
      >
        TestSubRoute
      </RouteLink>
    </p>
    <p>
      <RouteLink
        route={{ name: 'TestSubIdRoute', id: 'id' }}
        css={styles.link}
        element="Button"
      >
        TestSubIdRoute
      </RouteLink>
    </p>
  </div>
);

const PartialMatch = () => (
  <div>
    <p>PartialMatch</p>
    <p>
      <MatchRouteLink
        route={{ name: 'TestRoute' }}
        matchModel="PartialMatch"
        css={styles.link}
        activeCss={styles.activeLink}
        element="Button"
      >
        TestRoute
      </MatchRouteLink>
    </p>
    <p>
      <MatchRouteLink
        route={{ name: 'TestSubRoute' }}
        matchModel="PartialMatch"
        css={styles.link}
        activeCss={styles.activeLink}
        element="Button"
      >
        TestSubRoute
      </MatchRouteLink>
    </p>
    <p>
      <MatchRouteLink
        route={{ name: 'TestSubIdRoute', id: 'id' }}
        matchModel="PartialMatch"
        css={styles.link}
        activeCss={styles.activeLink}
        element="Button"
      >
        TestSubIdRoute
      </MatchRouteLink>
    </p>
  </div>
);

const FullMatch = () => (
  <div>
    <p>FullMatch</p>
    <p>
      <MatchRouteLink
        route={{ name: 'TestRoute' }}
        matchModel="FullMatch"
        css={styles.link}
        activeCss={styles.activeLink}
        element="Button"
      >
        TestRoute
      </MatchRouteLink>
    </p>
    <p>
      <MatchRouteLink
        route={{ name: 'TestSubRoute' }}
        matchModel="FullMatch"
        css={styles.link}
        activeCss={styles.activeLink}
        element="Button"
      >
        TestSubRoute
      </MatchRouteLink>
    </p>
    <p>
      <MatchRouteLink
        route={{ name: 'TestSubIdRoute', id: 'id' }}
        matchModel="FullMatch"
        css={styles.link}
        activeCss={styles.activeLink}
        element="Button"
      >
        TestSubIdRoute
      </MatchRouteLink>
    </p>
  </div>
);
