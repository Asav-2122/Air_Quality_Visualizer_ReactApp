import React, { memo } from "react";
import { useFetch } from "../../../custom-hooks/useFetch";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MeasurmentsOfSelectedCity.css";
import { Icon } from "leaflet";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";

const MeasurmentsOfSelectedCity = ({ selectedCity }) => {
  const { isLoading, apiData, serverError } = useFetch(
    `https://api.openaq.org/v2/latest?city=${selectedCity}`
  );
  const CustomIcon = new Icon({
    iconUrl: "../../../utils/images/placeholder.png",
    iconSize: [38, 38],
  });
  if (isLoading) {
    return <h3>Data Loading....</h3>;
  }
  if (serverError && isLoading === false) {
    return <h3>Error In Data Fetching</h3>;
  }

  return (
    <div>
      {apiData?.length !== 0 && (
        <div className="main-container">
          <div className="barchart-container">
            <h3>Measurements Of Pollutants</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <BarChart
                width={500}
                height={300}
                data={apiData[0]?.measurements}
              >
                <XAxis dataKey="parameter" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="value" fill="#8884d8" barSize={30} />
              </BarChart>
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 450 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Parameter</TableCell>
                      <TableCell align="right">Value</TableCell>
                      <TableCell align="right">Unit</TableCell>
                      <TableCell align="right">LastUpdated</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {apiData[0]?.measurements.map((row) => (
                      <TableRow
                        key={row.parameter}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.parameter}
                        </TableCell>
                        <TableCell align="right">{row.value}</TableCell>
                        <TableCell align="right">{row.unit}</TableCell>
                        <TableCell align="right">
                          {moment(row.lastUpdated, "YYYYMMDD").fromNow()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
            <h3 style={{marginTop:"30px"}}>Exact Location Of {selectedCity} On Map</h3>
          <div className="map-container">
            <MapContainer
              center={[
                apiData[0]?.coordinates?.latitude,
                apiData[0]?.coordinates?.longitude,
              ]}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                icon={CustomIcon}
                position={[
                  apiData[0]?.coordinates?.latitude,
                  apiData[0]?.coordinates?.longitude,
                ]}
              >
                <Popup>
                  {selectedCity}
                  <br />
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeasurmentsOfSelectedCity;
