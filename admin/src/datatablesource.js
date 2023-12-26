export const userColumns = [
  { field: "userId", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
            alt="avatar"
          />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "firstName",
    headerName: "First Name",
    width: 100,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 100,
  },
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
];

export const roomColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Name",
    width: 230,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "priceAmount",
    headerName: "Price",
    width: 100,
  },
  {
    field: "priceCurrency",
    headerName: "priceCurrency",
    width: 100,
  },
  {
    field: "isReserved",
    headerName: "Reserved",
    width: 100,
  },
  {
    field: "floor",
    headerName: "Floor",
    width: 100,
  },
  {
    field: "bedCount",
    headerName: "Bed",
    width: 100,
  },
];

export const bookingColumn = [
  { field: "id", headerName: "ID", width: 250 },
  {
    field: "userId",
    headerName: "USER ID",
    width: 150,
  },
  {
    field: "orderId",
    headerName: "ORDER ID",
    width: 100,
  },
  {
    field: "fromDate",
    headerName: "FROM DATE",
    width: 230,
  },
  {
    field: "toDate",
    headerName: "TO DATE",
    width: 100,
  },
  {
    field: "bedCount",
    headerName: "BED COUNT",
    width: 100,
  },
  {
    field: "floor",
    headerName: "FLOOR",
    width: 100,
  },
];
