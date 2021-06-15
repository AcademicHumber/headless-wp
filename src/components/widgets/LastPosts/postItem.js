import React from "react"
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser"
import { Typography } from "@material-ui/core"
import { Link } from "gatsby"

export default function PostItem({ post }) {
  const featuredImage = {
    fluid: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    alt: post.featuredImage?.node?.alt || ``,
  }
  return (
    <div className="widget-post-item">
      {/* if we have a featured image for this post let's display it */}
      {featuredImage?.fluid && (
        <Link to={post.uri} className="post_item_image">
          <GatsbyImage image={featuredImage.gatsbyImageData} alt={featuredImage.alt} />
        </Link>
      )}
      <Link to={post.uri} className="post_item_title">
        <Typography variant="h6" color="textSecondary">
          {parse(post.title)}
        </Typography>
      </Link>

      <Typography
        variant="caption"
        color="textSecondary"
        className="post_item_date"
      >
        {parse(post.date)}
      </Typography>
    </div>
  );
}
