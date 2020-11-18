import WidgetTotalData, {
  WidgetTotalDataProps as WidgetTotalDataPropsBase,
} from './WidgetTotalData';
import WidgetAgeDistribution, {
  WidgetAgeDistributionProps as WidgetAgeDistributionPropsBase,
} from './WidgetAgeDistribution';
import WidgetDomicileDistribution, {
  WidgetDomicileDistributionProps as WidgetDomicileDistributionPropsBase,
} from './WidgetDomicileDistribution';
import WidgetGenderRatio, {
  WidgetGenderRatioProps as WidgetGenderRatioPropsBase,
} from './WidgetGenderRatio';

export type WidgetTotalDataProps = WidgetTotalDataPropsBase;
export type WidgetAgeDistributionProps = WidgetAgeDistributionPropsBase;
export type WidgetDomicileDistributionProps = WidgetDomicileDistributionPropsBase;
export type WidgetGenderRatioProps = WidgetGenderRatioPropsBase;

export default {
  TotalData: WidgetTotalData,
  AgeDistribution: WidgetAgeDistribution,
  DomicileDistribution: WidgetDomicileDistribution,
  GenderRatio: WidgetGenderRatio,
};
