import React, { useState, useEffect, useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import getMenuItems from '../../../menu-items'; // Import the function
import { UserContext } from '../../../contexts/UserContext';
import { BASE_TITLE } from '../../../config/constant';

const Breadcrumb = () => {
  const location = useLocation();
  const { role } = useContext(UserContext); // Get role from context

  // Call getMenuItems with the role to get the navigation object
  const navigation = getMenuItems(role);

  const [main, setMain] = useState(null);
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (navigation && navigation.items) {
      navigation.items.forEach((navItem) => {
        if (navItem.type === 'group') {
          getCollapse(navItem);
        }
      });
    }
  }, [navigation, location.pathname]);

  const getCollapse = (navItem) => {
    if (navItem.children) {
      navItem.children.forEach((child) => {
        if (child.type === 'collapse') {
          getCollapse(child);
        } else if (child.type === 'item') {
          if (location.pathname === child.url) {
            setMain(navItem);
            setItem(child);
          }
        }
      });
    }
  };

  let mainContent = null;
  let itemContent = null;
  let breadcrumbContent = null;
  let title = '';

  if (main && main.type === 'collapse') {
    mainContent = (
      <ListGroup.Item as="li" bsPrefix=" " className="breadcrumb-item">
        <Link to="#">{main.title}</Link>
      </ListGroup.Item>
    );
  }

  if (item && item.type === 'item') {
    title = item.title;
    itemContent = (
      <ListGroup.Item as="li" bsPrefix=" " className="breadcrumb-item">
        <Link to="#">{title}</Link>
      </ListGroup.Item>
    );

    if (item.breadcrumbs !== false) {
      breadcrumbContent = (
        <div className="page-header">
          <div className="page-block">
            <div className="row align-items-center">
              <div className="col-md-12">
                <div className="page-header-title">
                  <h5 className="m-b-10">{title}</h5>
                </div>
                <ListGroup as="ul" bsPrefix=" " className="breadcrumb">
                  <ListGroup.Item as="li" bsPrefix=" " className="breadcrumb-item">
                    <Link to="/">
                      <i className="feather icon-home" />
                    </Link>
                  </ListGroup.Item>
                  {mainContent}
                  {itemContent}
                </ListGroup>
              </div>
            </div>
          </div>
        </div>
      );
    }

    document.title = title + BASE_TITLE;
  }

  return <>{breadcrumbContent}</>;
};

export default Breadcrumb;
