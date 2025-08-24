import TeacherService from '@services/TeacherService';
import { useState } from 'react';

type Props = {
  teacherId: number;
  learningPath: string;
};

const LearningPath: React.FC<Props> = ({ teacherId, learningPath }: Props) => {
  const [value, setValue] = useState<string>(learningPath ?? '');
  
  const handleLearningPathChange = async (event: { target: { value: string } }) => {
    const newValue = event.target.value;
    await TeacherService.updateLearningPath(teacherId, newValue);
    setValue(newValue);
  };

  return (
    <div className="ml-6">
      <select id="learningPath" className="ml-2 p-1" value={value} onChange={handleLearningPathChange}>
        <option value="Infrastructure">Infrastructure</option>
        <option value="Software development">Software development</option>
        <option value="Cybersecurity">Cybersecurity</option>
      </select>
    </div>
  );
};

export default LearningPath;
