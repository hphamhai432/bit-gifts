import { useAuth } from "./use-auth-client";
import TopNav from "./components/TopNav";
import Footer from "./Footer";
import { ImageTextCTA } from "./Landing";

function LoggedOut() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <TopNav tab="new" />

      <ImageTextCTA
        title="Sign in"
        text="Log in to create secure, personalized BitGifts powered by ckBTC and the Internet Computer. It's fast, easy, and the perfect way to share Bitcoin with loved ones."
        img="/visuals/door-welcome.jpeg"
        cta="Sign in with Internet Identity"
        imageRight={false}
        className="grow content-center"
      />

      <Footer />
    </>
  );
}

export default LoggedOut;
