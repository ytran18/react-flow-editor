import { useSelector } from 'react-redux';
import { flowPackageSelector } from '../selectors';

export const useFlowPackageHook = () => {
    return useSelector(flowPackageSelector);
};