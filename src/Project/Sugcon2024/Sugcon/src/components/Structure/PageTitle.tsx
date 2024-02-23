import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { Link, LinkField, Text, TextField, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import bg from '../../assets/images/SUGCON-hero-artwork.jpg';

interface Fields {
  data: {
    datasource: {
      url: {
        path: string;
        siteName: string;
      };
      field: {
        jsonValue: {
          value: string;
          editable: string;
        };
      };
    };
    contextItem: {
      url: {
        path: string;
        siteName: string;
      };
      field: {
        jsonValue: {
          value: string;
          editable: string;
        };
      };
    };
  };
}

type PageTitleProps = {
  params: { [key: string]: string };
  fields: Fields;
};
type ComponentContentProps = {
  id: string;
  styles: string;
  children: JSX.Element;
};

const ComponentContent = (props: ComponentContentProps) => {
  const id = props.id;
  return (
    <div className={`component title ${props.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <div className="field-title">{props.children}</div>
      </div>
    </div>
  );
};

export const Default = (props: PageTitleProps): JSX.Element => {
  //const id = props.params.RenderingIdentifier;
  const datasource = props.fields?.data?.datasource || props.fields?.data?.contextItem;
  const { sitecoreContext } = useSitecoreContext();

  const text: TextField = {
    value: datasource?.field?.jsonValue?.value,
    editable: datasource?.field?.jsonValue?.editable,
  };
  const link: LinkField = {
    value: {
      href: datasource?.url?.path,
      title: datasource?.field?.jsonValue?.value,
      editable: true,
    },
  };
  
  if (sitecoreContext.pageState !== 'normal') {
    link.value.querystring = `sc_site=${datasource?.url?.siteName}`;
    if (!text.value) {
      text.value = 'Title field';
      link.value.href = '#';
    }
  }

  return (
    <Box width="100%" background="linear-gradient(#eb1f1f 40% , #2B317B)" backgroundImage={bg.src} backgroundPosition="center" backgroundSize="cover" backgroundRepeat="no-repeat" color="white">
      <Box w="80%" pt={10} m="auto">
        <>
          <Heading as="h1" size="lg" fontSize="30px" fontWeight="normal" mb="33px">
            <Text field={text} />
          </Heading>
        </>
      </Box>
    </Box>
  );
};
