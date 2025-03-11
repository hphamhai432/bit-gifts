const Footer = () => {
  return (
    <div className="row footer bg-gray-700 text-gray-100">
      <div className="w-max-center border-top border-y border-gray-500 py-4 flex flex-row gap-8 justify-around">
        <FooterLinkBlock
          title="Features"
          links={[
            ["Create", "/create"],
            ["Redeem", "/redeem"],
            ["Learn", "/learn"],
          ]}
        />
        <FooterLinkBlock
          title="Resources"
          links={[
            ["Bitcoin", "/learn/bitcoin"],
            ["Internet Computer", "/learn/icp"],
            ["ckBTC", "/learn/ckBTC"],
          ]}
        />
      </div>
    </div>
  );
};

const FooterLinkBlock = ({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) => {
  const lis = links.map(([title, link], index) => (
    <li key={index + link} className={index > 2 ? "hidden sm:block" : ""}>
      <a href={link} target="_blank">
        {title}
      </a>
    </li>
  ));
  return (
    <div className="">
      <h3>{title}</h3>
      <ul>{lis}</ul>
    </div>
  );
};

export default Footer;
