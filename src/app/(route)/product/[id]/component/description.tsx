export default function Desciption({ description }: { description: string }) {
    return (
        <div className="text-lg text-gray-700 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: description }}>

        </div>
    )
};
