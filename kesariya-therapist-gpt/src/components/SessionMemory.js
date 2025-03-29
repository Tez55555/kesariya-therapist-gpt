export const saveSession = (data) => {
    localStorage.setItem('kesariyaSession', JSON.stringify(data));
  };
  
  export const loadSession = () => {
    const data = localStorage.getItem('kesariyaSession');
    return data ? JSON.parse(data) : null;
  };
  