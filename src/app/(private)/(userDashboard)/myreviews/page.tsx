import MyReview from './_Component/MyReview';

export const metadata = {
  title: 'My Reviews',
  description: 'Track all your past and upcoming service bookings',
};

export default function page() {
  return (
    <div>
      <MyReview />
    </div>
  );
}
