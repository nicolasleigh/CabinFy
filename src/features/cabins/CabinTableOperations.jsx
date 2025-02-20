import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField='discount'
        options={[
          { value: 'all', label: 'All' },
          { value: 'no-discount', label: 'No discount' },
          { value: 'with-discount', label: 'With discount' },
        ]}
      />

      <SortBy
        options={[
          {
            value: 'name-asc',
            label: 'Sort by name (A-Z)',
          },
          { value: 'name-desc', label: 'Sort by name(Z-A)' },
          { value: 'regularPrice-asc', label: 'Sort by price (Ascending)' },
          { value: 'regularPrice-desc', label: 'Sort by price (Descending)' },
          { value: 'location-asc', label: 'Sort by location (A-Z)' },
          { value: 'location-desc', label: 'Sort by location (Z-A)' },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
