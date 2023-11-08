import React, { useEffect } from "react";
import { Container, Carousel } from "react-bootstrap";

const blogPosts = [
  {
    title: "Blog Post 1",
    date: "October 1, 2023",
    content: "This is the content of Blog Post 1.",
    image:
      "https://assets-global.website-files.com/6185b708a2657014268d2eaf/61f7f2d5b420723b96bac36b_get-elastic-600x359.png",
  },
  {
    title: "Blog Post 2",
    date: "October 5, 2023",
    content: "This is the content of Blog Post 2.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVeciRB1Rmn9_iX_E07YjPtwRmAUm3NA-g3w&usqp=CAU",
  },
  {
    title: "Blog Post 3",
    date: "October 10, 2023",
    content: "This is the content of Blog Post 3.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjwSEDoeeh9Z_B6lKkD87RPbKvtJANOxly2Q&usqp=CAU",
  },
  // Add more blog posts as needed
];

const BlogPage = () => {
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <Container className="blog-container mt-4">
        <Carousel
          className="blog-carousel"
          style={{ width: "100%", height: "100%", margin: 0, padding: 0 }}>
          {blogPosts.map((post, index) => (
            <Carousel.Item key={index} className="blog-item">
              <img
                className="d-block w-100 blog-image"
                src={post.image}
                alt={post.title}
              />
              <Carousel.Caption className="text-black fs-4 fw-bolder">
                <h3 className="blog-post-title">{post.title}</h3>
                <p className="blog-date">{post.date}</p>
                <p className="blog-content">{post.content}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </>
  );
};

export default BlogPage;
