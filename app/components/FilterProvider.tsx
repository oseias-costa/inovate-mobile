import { ReactNode, createContext, useContext, useState } from 'react';

interface FilterContextType {
  requestFilter: string;
  setRequestFilter: React.Dispatch<React.SetStateAction<string>>;
  reportFilter: '' | 'PENDING' | 'FINISH' | 'EXPIRED';
  setReportFilter: React.Dispatch<React.SetStateAction<'' | 'PENDING' | 'FINISH' | 'EXPIRED'>>;
  noticeFilter: string;
  setNoticeFilter: React.Dispatch<React.SetStateAction<string>>;
}

export const FilterContext = createContext<FilterContextType>({
  requestFilter: '',
  setRequestFilter: () => {},
  reportFilter: '',
  setReportFilter: () => {},
  noticeFilter: '',
  setNoticeFilter: () => {},
});

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [requestFilter, setRequestFilter] = useState('');
  const [reportFilter, setReportFilter] = useState<'' | 'PENDING' | 'FINISH' | 'EXPIRED'>('');
  const [noticeFilter, setNoticeFilter] = useState('');

  return (
    <FilterContext.Provider
      value={{
        requestFilter,
        setRequestFilter,
        reportFilter,
        setReportFilter,
        noticeFilter,
        setNoticeFilter,
      }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
