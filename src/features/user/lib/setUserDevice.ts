export const setUserDevice = (): 'mobile' | 'tablet' | 'desktop' => {
  const userAgent = navigator.userAgent.toLowerCase();
  const width = window.innerWidth;
  const isMobile = /tablet|android|iphone|ipod|windows phone/i.test(userAgent);
  const isTablet = /tablet|ipad|playbook|silk/i.test(userAgent);

  if (isMobile && width < 768) {
    return 'mobile';
  } else if (isTablet && width < 1024 && width > 767) {
    return 'tablet';
  } else if (width > 1024) return 'desktop';

  if (width < 768) return 'mobile';
  else if (width < 1024) return 'tablet';
  else return 'desktop';
};
