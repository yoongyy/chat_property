
import React from 'react';
import { Property } from '../types';
import { Bed, Bath, Move, MapPin } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onView?: (id: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onView }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-100 group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={property.imageUrl} 
          alt={property.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-blue-600">
            {property.type}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-slate-800 line-clamp-1">{property.title}</h3>
          <span className="text-blue-600 font-bold">RM {property.price}</span>
        </div>
        <div className="flex items-center text-slate-500 text-sm mb-4">
          <MapPin size={14} className="mr-1" />
          {property.location}
        </div>
        <div className="flex justify-between items-center py-3 border-t border-slate-50">
          <div className="flex items-center gap-4 text-slate-600 text-xs">
            <span className="flex items-center gap-1"><Bed size={14} /> {property.bedrooms}</span>
            <span className="flex items-center gap-1"><Bath size={14} /> {property.bathrooms}</span>
            <span className="flex items-center gap-1"><Move size={14} /> {property.sqft} sqft</span>
          </div>
          <button 
            onClick={() => onView?.(property.id)}
            className="bg-slate-50 hover:bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
