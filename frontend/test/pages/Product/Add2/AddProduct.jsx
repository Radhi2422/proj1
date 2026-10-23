import  { useState } from "react";
import "./AddProduct.css";
import { validateProduct } from "../../../utils/validation";
import useAdd from "../../../hooks/useAdd";
import { logFrontendError } from "../../../utils/errorLogger";

export default function AddProduct() {
  const initialState={
    productName:"Hey",sku:"",barcode:"",brand:"",
    category:"",subCategory:"",
    shortDescription:"",description:"",
    mrp:"",sellingPrice:"",costPrice:"",
    discountType:"",discountValue:"",tax:"",
    currency:"INR",
    stockQuantity:"",minStock:"",maxStock:"",
    reorderLevel:"",warehouse:"",unit:"Piece",
    weight:"",length:"",width:"",height:"",
    shippingClass:"",fragile:false,
    warrantyMonths:"",returnWindow:"",
    returnable:true,replacement:true,
    slug:"",metaTitle:"",metaDescription:"",
    keywords:"",status:"Draft",
    featured:false,trending:false,bestSeller:false,newArrival:false,
    tags:"",adminNotes:"",
    mainImage:null,galleryImages:[],
    specifications:[{key:"",value:""}],
    variants:[{color:"",size:"",sku:"",price:"",stock:""}]
  }
  const [formData, setFormData] = useState(initialState)
    
// const [formData, setFormData] = useState(initialState);

  const { add } = useAdd();
const [errors, setErrors] = useState({});

  const change=(e)=>{
    const {name,value,type,checked,files}=e.target;
    setFormData(p=>({...p,[name]:
      type==="checkbox"?checked:
      type==="file"?(name==="galleryImages"?Array.from(files):files[0]):value}));
  };

  const specChange=(i,f,v)=>{
    const a=[...formData.specifications];a[i][f]=v;
    setFormData({...formData,specifications:a});
  };
  const varChange=(i,f,v)=>{
    const a=[...formData.variants];a[i][f]=v;
    setFormData({...formData,variants:a});
  };

  const submit=async(e)=>{
    try{
    e.preventDefault();
    const validationErrors = validateProduct(formData);
    const fd=new FormData();
    Object.entries(formData).forEach(([k,v])=>{
      if(k==="galleryImages") v.forEach(f=>fd.append("galleryImages",f));
      else if(k==="mainImage"&&v) fd.append("mainImage",v);
      else if(["variants","specifications"].includes(k)) fd.append(k,JSON.stringify(v));
      else fd.append(k,v);
    });
    if (Object.keys(validationErrors).length > 0) {
      console.log("Validation errors:", validationErrors);
    setErrors(validationErrors);
    return;
  }
    console.log("Heyy");
    await add({
      endpoint: "/products/add-product",
      data: fd,
      successMessage: "Product Added Successfully!",
      errorMessage: "Failed to add product",
      resetForm: () => setFormData(initialState),
    });
  }catch(err){
    logFrontendError(err, {
            component: "ProductList",
            method: "fetchProducts"
        });
  }
  };

  const input=(label,name,type="text")=>
  <div>
  <label style={{color:"Black"}}>{label}</label>
  <input type={type} name={name} 
  value={formData[name]} onChange={change}
  className={errors[name]? "error-input":""}/>
  {errors[name] && (
      <p className="error">{errors[name]}</p>
    )}
  </div>;

  return (
    <div className="container">
      <h1>Add Product</h1>
      <form onSubmit={submit}>
        <section><h2 style={{color:"red"}}>Basic</h2><div className="grid">
          {input("Product Name","productName")}
          {input("SKU","sku")}
          {input("Barcode","barcode")}
          {input("Brand","brand")}
          {input("Category","category")}
          {input("Sub Category","subCategory")}
          <div className="full"><label style={{color:"red"}}>Short Description</label><textarea name="shortDescription" value={formData.shortDescription} onChange={change}/></div>
          <div className="full"><label style={{color:"red"}}>Description</label><textarea name="description" value={formData.description} onChange={change}/></div>
        </div></section>

        <section><h2 style={{color:"red"}}>Pricing</h2><div className="grid">
          {input("MRP","mrp","number")}{input("Selling Price","sellingPrice","number")}
          {input("Cost Price","costPrice","number")}{input("Discount Type","discountType")}
          {input("Discount Value","discountValue","number")}{input("Tax %","tax","number")}
          {input("Currency","currency")}
        </div></section>

        <section><h2 style={{color:"red"}}>Inventory</h2><div className="grid">
          {input("Stock","stockQuantity","number")}{input("Min Stock","minStock","number")}
          {input("Max Stock","maxStock","number")}{input("Reorder","reorderLevel","number")}
          {input("Warehouse","warehouse")}{input("Unit","unit")}
        </div></section>

        {/* <section><h2 style={{color:"red"}}>Images</h2>
          <label style={{color:"red"}}>Main</label><input type="file" name="mainImage" onChange={change}/>
          <label style={{color:"red"}}>Gallery</label><input type="file" multiple name="galleryImages" onChange={change}/>
        </section> */}

        <section><h2 style={{color:"red"}}>Variants</h2>
        {formData.variants.map((v,i)=><div style={{color:"red"}} className="grid" key={i}>
          {["color","size","sku","price","stock"].map(f=><input key={f} placeholder={f} value={v[f]} onChange={e=>varChange(i,f,e.target.value)}/>)}
        </div>)}
        <button type="button" onClick={()=>setFormData({...formData,variants:[...formData.variants,{color:"",size:"",sku:"",price:"",stock:""}]})}>+ Variant</button>
        </section>

        <section><h2 style={{color:"red"}}>Specifications</h2>
        {formData.specifications.map((s,i)=><div style={{color:"red"}} className="grid" key={i}>
          <input placeholder="Key" value={s.key} onChange={e=>specChange(i,"key",e.target.value)}/>
          <input placeholder="Value" value={s.value} onChange={e=>specChange(i,"value",e.target.value)}/>
        </div>)}
        <button type="button" onClick={()=>setFormData({...formData,specifications:[...formData.specifications,{key:"",value:""}]})}>+ Specification</button>
        </section>

        <section>
        <h2 style={{color:"red"}}>Shipping</h2>
        <div className="grid">
          {input("Weight","weight","number")}
          {input("Length","length","number")}
          {input("Width","width","number")}
          {input("Height","height","number")}
          {input("Shipping Class","shippingClass")}
        </div></section>

        <section>
        <h2 style={{color:"red"}}>SEO</h2>
        <div className="grid">
          {input("Slug","slug")}
          {input("Meta Title","metaTitle")}
          <div className="full">
          <textarea name="metaDescription" 
          value={formData.metaDescription} 
          onChange={change}/>
          </div>
          {input("Keywords","keywords")}
        </div>
        </section>
        <button type="submit">Add Product</button>
      </form>
    </div>);
}
