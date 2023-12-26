import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const BookingDatatable = ({ columns }) => {
  const [list, setList] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");

    if (storedAccessToken) {
      setToken(storedAccessToken);
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    const fetch = async () => {
      const res = await axios.get(
        "http://localhost:8080/api/bookings/get-all",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setList(res.data);
    };
    fetch();
  }, [token]);

  console.log(list);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/rooms/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setList(list.filter((item) => item.id !== id));
    } catch (err) {}
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">Bookings</div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default BookingDatatable;
