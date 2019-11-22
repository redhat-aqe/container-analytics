export interface IPullCountCustomerRecord {
  download_date: string;
  country: string;
  customer_name: string;
  pull_count: number;
}

export interface IPullCountTagRecord {
  download_date: string;
  image_tags: string[];
  pull_count: number;
}

export interface IPullCountStatistics {
  by_customers: IPullCountCustomerRecord[];
  by_tags: IPullCountTagRecord[];
  total_countries: number;
  total_customers: number;
  total_pulls: number;
}
