import React from "react";
import "./styles.scss";
import { Logo } from "../../logos";

interface ProjectLogoProps {
  title?: string;
  link?: string;
}

export const ProjectLogo: React.FC<ProjectLogoProps> = ({
  title,
  link = "/",
}) => (
  <div className="ProjectLogo">
    <a href={link} rel="noreferrer noopener">
      <Logo.Stellar />
    </a>
    {title ? <div className="ProjectLogo__title">{title}</div> : null}
  </div>
);

ProjectLogo.displayName = "ProjectLogo";
