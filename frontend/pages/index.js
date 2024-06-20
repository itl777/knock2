import IndexLayout from '@/components/layout'
import Banner from '@/components/page-components/home/banner/banner'
import HomeSection2 from '@/components/page-components/home/section2'
import HomeSection3 from '@/components/page-components/home/section3'


export default function Home() {
  return (
    <>
      <IndexLayout>
        <Banner />
        <HomeSection2 />
        <HomeSection3 />
      </IndexLayout>
    </>
  )
}

// Home.getLayout = function getLayout(page) {
//   return <IndexLayout title="首頁">{page}</IndexLayout>;
// };
