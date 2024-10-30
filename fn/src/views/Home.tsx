import React, { useEffect, useState } from "react";
import Hero from "../assets/images/images (1).jpeg";
import Hero2 from "../assets/images/images (2).jpeg";
import Hero3 from "../assets/images/images (3).jpeg";
import Hero4 from "../assets/images/images (4).jpeg";
import Hero5 from "../assets/images/images (5).jpeg";

import Star from "../assets/images/star.svg";

import SectionHeader from "../components/SectionHeader.tsx";
import ServicesSection from "../components/servicesSection.tsx";
import CollectionCard from "../components/CollectionCard.tsx";
import axiosClient from "../hooks/AxiosInstance.tsx";

interface Product {
  id: string;
  images: string[];
  name: string;
  price: string;
  discount: string;
  discription: string;
  rating: number;
}

const Home: React.FC = () => {
  const [newArrivalProducts, setNewArrivalProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newArrivalPage, setNewArrivalPage] = useState(1);
  const [featuredPage, setFeaturedPage] = useState(2);
  const [recommendedPage] = useState(1);
  const client = axiosClient();

  const fetchNewArrivalProducts = async (page: number) => {
    try {
      const response = await client.get(`/collections/products/all?page=${page}`);
      setNewArrivalProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching new arrival products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFeaturedProducts = async () => {
    try {
    } catch (error) {
      console.error("Error fetching featured products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRecommendedProducts = async () => {
  try {
  } catch (error) {
    console.error("Error fetching recommended products:", error);
  } finally {
  }
};

  useEffect(() => {
    fetchNewArrivalProducts(newArrivalPage);
    fetchFeaturedProducts();
    fetchRecommendedProducts(); 

    const intervalId = setInterval(() => {
      setNewArrivalPage((prevPage) => (prevPage === 1 ? 2 : 1));
      setFeaturedPage((prevPage) => (prevPage === 2 ? 3 : 2));
      // setRecommendedPage((prevPage) => (prevPage === 2 ? 3 : 2));
    }, 60000); 

    return () => clearInterval(intervalId); 
  }, []);

  useEffect(() => {
    fetchNewArrivalProducts(newArrivalPage);
    fetchFeaturedProducts();
    // fetchRecommendedProducts(recommendedPage)
  }, [newArrivalPage, featuredPage]);

   useEffect(() => {
     if (recommendedPage > 1) {
       fetchRecommendedProducts();
     }
   }, [recommendedPage]);



  return (
    <div className="main-container px-10 py-5 flex flex-col gap-5">
      <div className="section-container tablet:flex justify-between items-center tablet:px-10">
        <div className="hero-content flex flex-col gap-10 items-start relative">
          <div className="star1 absolute top-5 right-0">
            <img src={Star} alt="star1" />
          </div>

          <h3 className="hero-text text-2xl phone:text-3xl tablet:text-5xl font-light w-[70%]">
          Your Searchplace for Quality  
            <span className="font- font-light italic underline"> Construction </span>{" "}
            Supplies
          </h3>
          <p className="w-[80%] tablet:w-[60%] text-sm">
          Find the Best Construction Materials, All in One Place!{" "}
          </p>
          {/* <Link to="" className="flex gap-2 rounded-full bg-black p-3 px-6">
            <p className="text-white text-sm">get materials</p>
            <HiOutlineShoppingBag color="white" />
          </Link> */}
        </div>
        <div className="hero-container relative w-[90%] tablet:w-[50%] mt-10 tablet:mt-1">
          <img src={Hero} alt="Hero" className="rd-sm" />
          <div className="star2 absolute phone:top-5 tablet:top-[80%] bigphone:bottom-5 tablet:left-[-50%] w-10">
            <img src={Star} alt="star2" />
          </div>
        </div>
      </div>

      <div className="section-container px-2 tablet:px-10 my-10">
        <SectionHeader title="Construction supplies" />
        <div className="product-container flex flex-wrap items-center justify-center tablet:justify-start gap-5 tablet:gap-10 my-5">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            newArrivalProducts.length > 0 ? (
              newArrivalProducts.map(() => (
                <CollectionCard
                Image={Hero2}
                name="Materials"
              />
              ))
            ) : (
              <>
              <CollectionCard
                    Image={Hero3}
                    name="Materials"
                  />  
              <CollectionCard
                    Image={Hero4}
                    name="Materials"
                  />
              <CollectionCard
                Image={Hero5}
                name="Materials"
              />
              </>
            )
          )}
        </div>
      </div>

      <div className="section-container px-2 tablet:px-10 my-10">
        <SectionHeader title="Explore more..." />
        <div className="product-container flex flex-wrap gap-5 tablet:gap-10 my-5 items-center">
          <CollectionCard
            Image={Hero}
            name="Steel"
          />
          <CollectionCard
        Image={Hero3}
            name="Houses"
          />
          <CollectionCard
            Image={Hero2}
            name="Bricks"
          />
        </div>
      </div>
      <ServicesSection />
    </div>
  );
};

export default Home;