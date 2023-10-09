import { forwardRef, useState } from 'react';
import { FieldError } from 'react-hook-form';
import FormControl from './FormControl';
import { uploadImage } from 'lib/api/image.api';

interface IProps extends React.HTMLProps<HTMLInputElement> {
  error?: FieldError;
  label?: string;
  setImageUrl: (s: string) => void;
  imageUrl: string;
  imageClass?: string;
}

const ImageUploader = forwardRef<HTMLInputElement, IProps>((props, ref) => {
  const {
    error,
    name,
    label,
    className,
    type,
    setImageUrl,
    imageUrl,
    imageClass,
    ...nativeInputElementProps
  } = props;

  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Read the selected image file and set it as the preview
      const reader = new FileReader();
      reader.onload = async () => {
        setImageUrl(reader.result as string);
        setLoading(true);
        await saveToServer(file);
        setLoading(false);
      };
      reader.readAsDataURL(file);
    } else {
      setImageUrl('');
    }
  };

  async function saveToServer(imageFile: any) {
    const formData = new FormData();
    if (imageFile) {
      formData.append('image', imageFile);
      const res = await uploadImage(formData);
      if (res) {
        const url = import.meta.env.VITE_SERVER_BASE + res;
        setImageUrl(url);
      } else {
        console.log('upload failed');
      }
    } else {
      console.error('image file is not provided');
    }
  }

  return (
    <FormControl className={className}>
      {label ? (
        <label htmlFor={name} className="label">
          <span className="label-text">{label}</span>
        </label>
      ) : null}
      <input
        {...nativeInputElementProps}
        onChange={(e) => {
          const file = e.target.files && e.target.files[0];
          if (file) {
            handleFileChange(e);
          }
        }}
        type="file"
        value=""
        ref={ref}
        id={name}
        className="file-input file-input-bordered file-input-primary border-2 w-full"
      />
      {error ? <span>{error.message}</span> : ''}
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Preview"
          className={`h-52 object-cover rounded-lg mt-4 ${imageClass ?? ''}`}
        />
      )}
      {loading && <span className="loading loading-spinner loading-lg"></span>}
    </FormControl>
  );
});

export default ImageUploader;
