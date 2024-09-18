import { warmUpCoolDownPrograms } from "@/lib/warmupCooldownPrograms";
import { warmUpCoolDownExercises } from "@/lib/warmUpCoolDownExercises";
import {
  ProgramCard,
  StyledTable,
  StyledTableRow,
  StyledTableHeader,
  StyledTableData,
  StyledTableDataExercises,
  StyledFilterButton,
} from "@/styledComponents";
import { useState } from "react";

function findWarmupCooldownExerciseById(exerciseId) {
  const stringId = String(exerciseId);
  const foundExercise = warmUpCoolDownExercises.find(
    (exercise) => exercise.id === stringId
  );
  if (!foundExercise) {
    console.warn(`Exercise with id ${stringId} not found`);
  }
  return foundExercise;
}

export default function PrepAndFollowUp() {
  const [showDetails, setShowDetails] = useState(false);
  const isDetailsVisible = showDetails[warmUpCoolDownExercises.id] || false;

  const toggleDetails = (workoutId) => {
    setShowDetails((prev) => ({
      ...prev,
      [workoutId]: !prev[workoutId],
    }));
  };

  return (
    <div>
      <h1>Heat It Up & Chill It Out</h1>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {warmUpCoolDownPrograms.map((program) => (
          <ProgramCard key={program.id}>
            <h2>{program.name}</h2>
            <StyledTable>
              <thead>
                <StyledTableRow>
                  <StyledTableHeader>Exercise</StyledTableHeader>
                  <StyledTableHeader>Reps</StyledTableHeader>
                  <StyledTableHeader>Duration</StyledTableHeader>
                </StyledTableRow>
              </thead>
              <tbody>
                {program.exerciseIds.map((exerciseId) => {
                  const exercise = findWarmupCooldownExerciseById(exerciseId);

                  if (!exercise) {
                    return null;
                  }

                  return (
                    <StyledTableRow key={exercise.id}>
                      <StyledTableDataExercises>
                        {exercise.name}
                      </StyledTableDataExercises>
                      <StyledTableData>{exercise.reps}</StyledTableData>
                      <StyledTableData>{exercise.duration}</StyledTableData>
                      <StyledTableData>
                        <StyledFilterButton
                          onClick={() =>
                            toggleDetails(warmUpCoolDownExercises.id)
                          }
                        >
                          {isDetailsVisible ? "Filter ▲" : "Filter ▼"}
                        </StyledFilterButton>
                      </StyledTableData>
                    </StyledTableRow>
                  );
                })}
              </tbody>
            </StyledTable>
          </ProgramCard>
        ))}
      </div>
    </div>
  );
}
