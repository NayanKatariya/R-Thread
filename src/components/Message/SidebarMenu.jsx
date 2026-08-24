"use client";
import NavigationItem from "./NavigationItem";
import NavigationHeader from "./NavigationHeader";

function SidebarNavigation({userEmails,getMessages}) {
  return (
    <nav className="flex z-10 flex-col my-8 pr-0.5 pl-2.5  w-full">
      <NavigationHeader title="Messages" />

      {
        userEmails?.map(data=>(
          <NavigationItem
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/dd9b62a188339c4adfb21c6f88242efe343b1b7d?placeholderIfAbsent=true&apiKey=6e145e9e22e040df9495b45716e8896e"
            text={data?.buyerEmail}
            getMessages={() => getMessages(data)}
            subText={data?.type}
            rightIcon="https://cdn.builder.io/api/v1/image/assets/TEMP/c3c25de8cf3c07d05c8fb8fa54ed6b22404e4fe1?placeholderIfAbsent=true&apiKey=6e145e9e22e040df9495b45716e8896e"
            variant="button"
          />

        ))
      }

    </nav>
  );
}

export default SidebarNavigation;
