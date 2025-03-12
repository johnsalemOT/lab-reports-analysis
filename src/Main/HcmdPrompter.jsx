import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DataInput from "../components/DataInput";
import FilterButtons from "../components/FilterButtons";
import { processPatientData } from "../services/api";
import ViewToggle from "../components/ViewToggle";
import DataView from "../components/DataView";

const HcmdPrompter = () => {
  const [patientData, setPatientData] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [outputData, setOutputData] = useState(null);
  const [viewMode, setViewMode] = useState('table')

  const handleProcessData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await processPatientData(patientData, filterOption);
      setOutputData(response);
    } catch (e) {
      setError("Failed to process data. Please try again.");
      console.error(e);
    }
    setLoading(false);
  };
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          HCMD Patient Prompter
        </Typography>
        <DataInput
          value={patientData}
          onChange={(e) => setPatientData(e.target.value)}
        ></DataInput>
        <FilterButtons
          onFilterSelect={(option) => setFilterOption(option)}
          onProcess={handleProcessData}
          filterOption={filterOption}
          disabled={loading || !patientData || !filterOption}
        />
        {loading && (
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Alert severity="error" sx={{ my: 2 }}>
            {error}
          </Alert>
        )}
        {outputData && (
          <>
            <ViewToggle viewMode={viewMode} onToggle={setViewMode} />
            <DataView viewMode={viewMode} data={outputData} />
          </>
        )}
      </Paper>
    </Container>
  );
};

export default HcmdPrompter;
