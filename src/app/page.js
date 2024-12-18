import Header from '@/components/Header';
import GoogleMap from '@/components/GoogleMap';
import InfoCard from '@/components/InfoCard';

import TrackList from '@/components/TrackList';

export default function Home() {
  return (
    <div className="relative w-full text-center bg-black">
      <div className="absolute top-0 homeBG bg-cover bg-center"></div>
      <div className="relative px-4">
        <Header />
        {/* Bottom cards */}
        {/* <div className="flex justify-center mt-12 md:mt-24 rounded-lg grid grid-cols-2 md:gap-4"> */}
        {/* <InfoCard title='Top Tracks' classes='rounded-lg md:rounded-l-lg' /> */}
        {/* <TrackList /> */}

        {/* <div className='text-black rounded-lg col-span-4 md:col-span-2'> */}
        {/* <GoogleMap apiKey={process.env.GOOGLE_MAPS_API_KEY} /> */}
        {/* </div> */}
        {/* <InfoCard title='Track Reviews' classes='rounded-lg md:rounded-r-lg' /> */}
        {/* </div> */}
      </div>
    </div >
  );
}
