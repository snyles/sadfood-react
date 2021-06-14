import useForm from '../lib/useForm';
import Form from './styles/Form';

export default function CreateProduct() {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    image: '',
    name: 'flip-flops',
    price: 1234,
    description: 'the great flip flops in all the land',
  });

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(inputs);
      }}
    >
      <fieldset aria-busy>
        <label htmlFor="image">
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="name">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  );
}
