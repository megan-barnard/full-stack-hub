import styled from "styled-components";

import { FaExternalLinkAlt, FaGithubSquare, FaLinkedin, FaInstagramSquare, FaFacebookSquare } from "react-icons/fa";

const SocialLinks = ({ user }) => {
  const link = { website: user.websiteUrl, github: user.githubUrl, linkedin: user.linkedinUrl, instagram: user.instagramUrl, facebook: user.facebookUrl };
  const linkNames = Object.keys(link);
  for (let i = 0; i < linkNames.length; i++) {
    if (!link[linkNames[i]].includes("http://") && link[linkNames[i]]) {
      link[linkNames[i]] = `http://${link[linkNames[i]]}`;
    }
  }

  return (
    <Wrapper style={{background: (user && user.bannerSrc) ? `url(${user.bannerSrc}) no-repeat center` : 'grey'}}>
      <SocialLinkDiv>
        {link.website && <SocialLink target="_blank" href={link.website}><FaExternalLinkAlt size={24} style={{color: link.iconColor ? link.iconColor : '' }}/></SocialLink>}
        {link.github && <SocialLink target="_blank" href={link.github}><FaGithubSquare size={25} style={{color: link.iconColor ? link.iconColor : '' }} /></SocialLink>}
        {link.linkedin && <SocialLink target="_blank" href={link.linkedin}><FaLinkedin size={25} style={{color: link.iconColor ? link.iconColor : '' }} /></SocialLink>}
        {link.instagram && <SocialLink target="_blank" href={link.instagram}><FaInstagramSquare size={25} style={{color: link.iconColor ? link.iconColor : '' }} /></SocialLink>}
        {link.facebook && <SocialLink target="_blank" href={link.facebook}><FaFacebookSquare size={25} style={{color: link.iconColor ? link.iconColor : '' }} /></SocialLink>}
      </SocialLinkDiv>
    </Wrapper>  
  )
};

const Wrapper = styled.div`
  width: 100%;
  height: 200px;
  border-left: 1px solid var(--color-light-grey);
  border-right: 1px solid var(--color-light-grey);
`;

const SocialLinkDiv = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 200px;
  padding: 6px 10px;
    
  @media screen and (max-width: 575px) {
    flex-direction: column-reverse;
    justify-content: flex-start;
  }
`;

const SocialLink = styled.a`
  color: var(--color-dark-grey);
  margin-left: 5px;
  cursor: pointer;
`;

export default SocialLinks;