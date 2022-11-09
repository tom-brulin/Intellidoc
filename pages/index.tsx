import { Category } from "../models/Category";
import { DocumentationService } from "../services/DocumentationService";

interface Props {
  categories: Category[];
}

export default function Home(props: Props) {
  const { categories } = props;

  return (
    <div>

    </div>
  )
}

export async function getStaticProps() {
  const documentationService = new DocumentationService();
  const categories = await documentationService.getCategories();

  console.log(categories);

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories))
    }
  }
}