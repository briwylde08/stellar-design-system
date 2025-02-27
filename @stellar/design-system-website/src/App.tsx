import { useMemo, useState, useLayoutEffect, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "@stellar/design-system";

import { Landing } from "pages/Landing";
import { ComponentDetails } from "pages/ComponentDetails";
import { SideNavContext } from "context/SideNav";
import {
  BREAKPOINT_SMALL,
  CSS_CLASS_SMALL_SCREEN,
  CSS_CLASS_SIDE_NAV_OPEN_TRIGGER,
  CSS_CLASS_SIDE_NAV_OPEN,
  CSS_CLASS_DISABLE_BODY_SCROLL,
} from "constants/variables";

import "styles.scss";

export const App = () => {
  const [sideNavState, setSideNavState] = useState({
    isEnabled: false,
    isOpen: false,
  });
  const sideNavStateValue = useMemo(
    () => ({ sideNavState, setSideNavState }),
    [sideNavState, setSideNavState],
  );

  // Handle media query for small/large page UI
  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${BREAKPOINT_SMALL}px)`);

    const handleMediaQuery = () => {
      if (mediaQuery.matches) {
        document.body.classList.add(CSS_CLASS_SMALL_SCREEN);
      } else {
        document.body.classList.remove(
          CSS_CLASS_SMALL_SCREEN,
          CSS_CLASS_SIDE_NAV_OPEN_TRIGGER,
          CSS_CLASS_SIDE_NAV_OPEN,
          CSS_CLASS_DISABLE_BODY_SCROLL,
        );
      }
    };

    handleMediaQuery();
    mediaQuery.addEventListener("change", handleMediaQuery);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQuery);
    };
  }, []);

  // Handle SideNav open/close state
  useEffect(() => {
    if (sideNavState.isOpen) {
      document.body.classList.add(
        CSS_CLASS_SIDE_NAV_OPEN_TRIGGER,
        CSS_CLASS_SIDE_NAV_OPEN,
        CSS_CLASS_DISABLE_BODY_SCROLL,
      );
    } else {
      document.body.classList.remove(
        CSS_CLASS_SIDE_NAV_OPEN,
        CSS_CLASS_DISABLE_BODY_SCROLL,
      );

      const delay = setTimeout(() => {
        document.body.classList.remove(CSS_CLASS_SIDE_NAV_OPEN_TRIGGER);
        clearTimeout(delay);
      }, 300);
    }
  }, [sideNavState.isOpen]);

  const toggleSideNav = (isOpen: boolean) => {
    setSideNavState({
      isEnabled: sideNavState.isEnabled,
      isOpen,
    });
  };

  return (
    <SideNavContext.Provider value={sideNavStateValue}>
      <Layout.Header
        projectId="Design System"
        projectTitle="Design System"
        hasThemeSwitch
        menu={{
          isEnabled: sideNavState.isEnabled,
          onOpen: () => toggleSideNav(true),
        }}
      />

      <Layout.Content>
        <Routes>
          <Route path="/" element={<Landing />} />

          <Route
            path="/component/:id"
            element={
              <ComponentDetails
                sideNavEnabled
                onToggleSideNav={toggleSideNav}
              />
            }
          />

          {/* TODO: add 404 */}
        </Routes>
      </Layout.Content>

      <Layout.Footer gitHubLink="https://github.com/stellar/stellar-design-system" />
    </SideNavContext.Provider>
  );
};
