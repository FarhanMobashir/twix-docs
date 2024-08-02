import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

// Define features for the Twix router
const FeatureList = [
  {
    title: "Routing",
    Svg: require("@site/static/img/twix.svg").default, // Replace with an appropriate image
    description: (
      <>
        Efficiently define and manage your routes with Twix. Easily add handlers for different HTTP methods and paths.
      </>
    ),
  },
  {
    title: "Middleware Support",
    Svg: require("@site/static/img/battery.svg").default, // Replace with an appropriate image
    description: (
      <>
        Enhance your routes with middleware support for functionalities like logging, CORS, and rate limiting.
      </>
    ),
  },
  {
    title: "Grouping",
    Svg: require("@site/static/img/group.svg").default, // Replace with an appropriate image
    description: (
      <>
        Organize routes into groups for better structure and middleware management with route prefixes.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
