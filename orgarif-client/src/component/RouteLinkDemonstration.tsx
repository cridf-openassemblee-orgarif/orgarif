/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import { colors } from '../styles/vars';
import { RouteLink, MatchRouteLink } from '../routing/RouteLink';

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
      <h1>RouteLink demonstration</h1>
      <div
        css={css`
          display: flex;

          > div {
            margin: 20px;
          }
        `}
      >
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
      </div>
    </>
  );
};
