
import CProduct from "@/app/(route)/product/page";
import BannerSlide from "@/components/ui/banner-slide";
import ContactUs from "@/components/ui/contact-us";

export default function Home() {
  console.log(process.env.GOOGLE_CLIENT_ID)

  const bannerImage = [
    '/img/banner4.png',
    '/img/banner2.png',
    '/img/banner.png',
  ]
  return (
    <>
      <BannerSlide listImage={bannerImage} />
      <CProduct />
      <ContactUs />
    </>

  );
}
