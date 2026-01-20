'use client';

import { useState, useCallback } from 'react';
import { ArrayOfObjectsInputProps, PatchEvent, set } from 'sanity';
import {
  Button,
  Stack,
  Text,
  Card,
  Box,
  Flex,
  Heading,
  Dialog,
} from '@sanity/ui';
import {
  AddIcon,
  DragHandleIcon,
  TrashIcon,
  WarningOutlineIcon,
  CheckmarkIcon,
} from '@sanity/icons';

interface ProjectReference {
  _key: string;
  _ref?: string;
  _type?: string;
}

export default function OpeningGalleryInput(
  props: ArrayOfObjectsInputProps
) {
  const { value = [], onChange } = props;
  const currentProjects = (value || []) as ProjectReference[];
  const [maxLimit, setMaxLimit] = useState(6);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [showLimitWarning, setShowLimitWarning] = useState(false);
  const [proposedLimit, setProposedLimit] = useState(maxLimit);

  const currentCount = currentProjects.length;
  const canAddMore = currentCount < maxLimit;
  const isAtLimit = currentCount >= maxLimit;

  // Handle slider change with validation
  const handleLimitChange = useCallback(
    (newLimit: number) => {
      setProposedLimit(newLimit);

      if (newLimit < currentCount) {
        setShowLimitWarning(true);
      } else {
        setMaxLimit(newLimit);
        setShowLimitWarning(false);
      }
    },
    [currentCount]
  );

  // Handle warning confirmation - user agrees to remove items first
  const handleWarningConfirm = useCallback(() => {
    setShowLimitWarning(false);
    setProposedLimit(maxLimit);
  }, [maxLimit]);

  // Force the new limit (user must remove items first)
  const forceNewLimit = useCallback(() => {
    setMaxLimit(proposedLimit);
    setShowLimitWarning(false);
  }, [proposedLimit]);

  // Add new project
  const handleAddProject = useCallback(() => {
    if (canAddMore) {
      const newProject = { _key: `${Date.now()}` };
      onChange(PatchEvent.from(set([...currentProjects, newProject])));
    }
  }, [canAddMore, currentProjects, onChange]);

  // Remove project
  const handleRemoveProject = useCallback(
    (index: number) => {
      const updated = currentProjects.filter((_, i) => i !== index);
      onChange(PatchEvent.from(set(updated)));
    },
    [currentProjects, onChange]
  );

  // Reorder projects with drag and drop
  const handleDragStart = useCallback((index: number) => {
    setDraggedIndex(index);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDropReorder = useCallback(
    (targetIndex: number) => {
      if (draggedIndex === null || draggedIndex === targetIndex) {
        setDraggedIndex(null);
        return;
      }

      const newProjects = [...currentProjects];
      const [draggedItem] = newProjects.splice(draggedIndex, 1);
      newProjects.splice(targetIndex, 0, draggedItem);
      onChange(PatchEvent.from(set(newProjects)));
      setDraggedIndex(null);
    },
    [draggedIndex, currentProjects, onChange]
  );

  return (
    <Stack space={4}>
   {/* Limit Warning Dialog */}
      {showLimitWarning && (
        <Card padding={4} border tone="caution">
          <Stack space={3}>
            <Flex gap={2}>
              <Box flex="none" marginTop={1}>
                <WarningOutlineIcon />
              </Box>
              <Stack space={2} flex={1}>
                <Text size={1} weight="semibold">
                  Cannot reduce limit
                </Text>
                <Text size={0}>
                  You have {currentCount} projects selected, but are trying to set the limit to{' '}
                  {proposedLimit}. Please remove {currentCount - proposedLimit} project
                  {currentCount - proposedLimit !== 1 ? 's' : ''} first.
                </Text>
              </Stack>
            </Flex>

            <Flex gap={2} justify="flex-end">
              <Button
                onClick={handleWarningConfirm}
                text="Keep current limit"
                mode="ghost"
              />
              {currentCount > proposedLimit && (
                <Button
                  onClick={forceNewLimit}
                  text={`Force to ${proposedLimit} (remove items first)`}
                  tone="caution"
                />
              )}
            </Flex>
          </Stack>
        </Card>
      )}

      {/* Status Card */}
      <Card padding={3} border tone={isAtLimit ? 'caution' : 'positive'}>
        <Stack space={2}>
          <Flex gap={2} align="center">
            {isAtLimit ? (
              <>
                <Box flex="none">
                  <WarningOutlineIcon />
                </Box>
                <Text size={0} weight="semibold">
                  Limit reached ({currentCount}/{maxLimit})
                </Text>
              </>
            ) : (
              <>
                <Box flex="none">
                  <CheckmarkIcon />
                </Box>
                <Text size={0} weight="semibold">
                  {currentCount}/{maxLimit} projects selected
                </Text>
              </>
            )}
          </Flex>

          {isAtLimit && (
            <Text size={0}>
              You've reached the limit. Remove a project to add another.
            </Text>
          )}

          {!isAtLimit && (
            <Text size={0}>
              {maxLimit - currentCount} more project{maxLimit - currentCount !== 1 ? 's' : ''} can
              be added
            </Text>
          )}
        </Stack>
      </Card>

      {/* Limit Control */}
        <Stack space={3}>
            <Flex gap={2} align="center">
              <Text size={1} weight="semibold">
                Maximum Projects: {maxLimit}
              </Text>
              <Text size={0} muted>
                ({currentCount} selected)
              </Text>
            </Flex>

              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={maxLimit}
                onChange={(e) => handleLimitChange(Number(e.target.value))}
                style={{
                  width: '100%',
                  height: '6px',
                  borderRadius: '3px',
                  background: '#d3d3d3',
                  outline: 'none',
                  WebkitAppearance: 'none',
                }}
              />

            <Text size={0} muted>
              Drag the slider to set how many projects can be added (1-10)
            </Text>
          </Stack>

   



      {/* Projects List */}
      {/* <Stack space={2}>
        <Heading size={0}>Project Order</Heading>

        {currentProjects.length === 0 ? (
          <Card padding={3} border tone="default">
            <Text size={0} muted>
              No projects added yet
            </Text>
          </Card>
        ) : (
          <Stack space={2}>
            {currentProjects.map((project, index) => (
              <Card
                key={project._key || index}
                padding={3}
                border
                tone={draggedIndex === index ? 'primary' : 'default'}
                style={{
                  opacity: draggedIndex === index ? 0.7 : 1,
                  cursor: 'grab',
                  transition: 'all 0.2s ease',
                }}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={() => handleDropReorder(index)}
              >
                <Flex gap={3} align="center">
                  <Box flex="none" style={{ cursor: 'grab' }}>
                    <DragHandleIcon />
                  </Box>

                  <Text size={0} weight="semibold">
                    #{index + 1}
                  </Text>

                  <Box flex={1}>
                    <Text size={0} muted>
                      {project._ref ? `Project (${project._ref})` : 'Pending project selection'}
                    </Text>
                  </Box>

                  <Button
                    icon={TrashIcon}
                    mode="ghost"
                    onClick={() => handleRemoveProject(index)}
                    aria-label="Remove project"
                  />
                </Flex>
              </Card>
            ))}
          </Stack>
        )}
      </Stack> */}

      {/* Add Button
      <Button
        text={`Add Project (${currentCount}/${maxLimit})`}
        icon={AddIcon}
        onClick={handleAddProject}
        disabled={!canAddMore}
        tone={isAtLimit ? 'critical' : 'primary'}
        mode="default"
        padding={3}
      /> */}

      {/* Render default Sanity UI for actual project selection */}
      <Box marginTop={4}>
        <Stack space={3}>
          <Heading size={0}>Project References</Heading>
          {props.renderDefault(props)}
        </Stack>
      </Box>
    </Stack>
  );
}
